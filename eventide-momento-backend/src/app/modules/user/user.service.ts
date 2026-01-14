import prisma from "../../../config/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config/config";
import { Response } from "express";
import {
  IAuthenticatedUser,
  ILoginUser,
  IUpdatePassword,
  IUser,
  IUserFilters,
} from "./user.interface";
import nodemailer from "nodemailer";
import { IPaginationOptions } from "../../../interface/pagination";
import { roleCheck } from "../../../utils/roleCheck";
import { UserSearchableFields } from "./user.constant";
import { calculatePaginationFunction } from "../../../helpers/paginationHelpers";
import { Prisma } from "@prisma/client";

const register = async (payload: IUser): Promise<IAuthenticatedUser> => {
  const { email, contactNumber, password } = payload;

  const lowerCasedEmail = email.toLowerCase();

  const isEmailExists = await prisma.user.findUnique({
    where: { email: lowerCasedEmail },
  });
  if (isEmailExists) {
    throw new ApiError(httpStatus.CONFLICT, "Email Already Exists!");
  }

  const isContactExists = await prisma.user.findUnique({
    where: { contactNumber },
  });
  if (isContactExists) {
    throw new ApiError(httpStatus.CONFLICT, "Contact Number Already Exists!");
  }

  const hashedPass = await bcrypt.hash(password, Number(config.salt_round));

  const user = await prisma.user.create({
    data: {
      email: lowerCasedEmail,
      password: hashedPass,
      contactNumber: payload.contactNumber,
      userName: payload.userName,
    },
  });

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    // host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: config.nodemailer_user,
      pass: config.nodemailer_pass,
    },
  });

  await transporter.sendMail({
    to: email,
    subject: "Welcome to Eventide Momento!",
    html: `
  <div style="font-family: Arial, sans-serif; color: #3a3a3a; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e7e6e6; border-radius: 8px; background-color: #ffffff;">
    <h2 style="color: #c00a27; text-align: center;">Welcome to Eventide Momento!</h2>

    <p>Hello ${user.userName},</p>

    <p>
      Thank you for joining <strong>Eventide Momento</strong> — your companion for balanced meals and smarter nutrition choices. We’re excited to have you onboard!
    </p>

    <p>
      You can now explore delicious recipes, track your meals, and discover insights that help you maintain a healthier lifestyle.
    </p>

    <div style="text-align: center; margin: 25px 0;">
      <a
        href="https://betterplate.vercel.app"
        style="display: inline-block; padding: 12px 26px; color: #ffffff; background-color: #c00a27; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold; transition: background-color 0.3s ease;">
        Visit Eventide Momento
      </a>
    </div>

    <p>
      If you didn’t sign up for Eventide Momento, please disregard this email — no action is required.
    </p>

    <p style="margin-top: 30px;">
      Cheers,<br>
      <strong>The Eventide Momento Team</strong>
    </p>

    <hr style="border: none; border-top: 1px solid #e7e6e6; margin: 25px 0;">

    <p style="font-size: 12px; color: #686464; text-align: center;">
      This is an automated message — please do not reply.<br>
      &copy; ${new Date().getFullYear()} Eventide Momento. All rights reserved.
    </p>
  </div>
  `,
  });

  const jwtPayload = {
    email: user.email,
    id: user.id,
  };

  const accessToken = jwtHelpers.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in
  );

  const refreshToken = jwtHelpers.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in
  );

  return {
    accessToken,
    refreshToken,
  };
};

const login = async (payload: ILoginUser): Promise<IAuthenticatedUser> => {
  const { email, password } = payload;

  const isExists = await prisma.user.findUnique({
    where: { email },
  });

  if (!isExists) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid Email or Password!");
  }

  if (isExists.activeStatus === false) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Please Check Email And Verify Your Account First!"
    );
  }

  const isPassMatched = await bcrypt.compare(password, isExists.password);
  if (!isPassMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid Email or Password!");
  }

  const jwtPayload = {
    email: isExists.email,
    id: isExists.id,
  };

  const accessToken = jwtHelpers.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in
  );

  const refreshToken = jwtHelpers.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in
  );

  return {
    accessToken,
    refreshToken,
  };
};

const getMe = async (token: string): Promise<Partial<IUser> | null> => {
  const { id, email } = jwtHelpers.jwtVerify(token, config.jwt_access_secret);
  const user = await prisma.user.findUnique({
    where: {
      email: email.toLowerCase(),
      id,
    },
  });

  if (user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
};

const logout = async (res: Response): Promise<null> => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  return null;
};

const updateUser = async (
  payload: Partial<IUser>,
  token: string
): Promise<IAuthenticatedUser> => {
  const { id: userId } = jwtHelpers.jwtVerify(token, config.jwt_access_secret);

  const isExistsUser = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  if (!isExistsUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Not Found");
  }

  const { password, ...updatePayload } = payload;

  if (isExistsUser.IsFirstTimeUpdated !== true) {
    payload.role !== undefined && (updatePayload.role = payload.role);
    payload.IsFirstTimeUpdated !== undefined &&
      (updatePayload.IsFirstTimeUpdated = payload.IsFirstTimeUpdated);
  } else {
    if (payload.role !== undefined) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Role Already has been update cannot be update again"
      );
    }

    if (payload.IsFirstTimeUpdated !== undefined) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "First-time update flag cannot be modified"
      );
    }
  }

  if (password !== undefined) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Permission Denied! Please Try Again."
    );
  }

  if (payload.email) {
    const isExists = await prisma.user.findFirst({
      where: { email: payload.email },
    });
    if (isExists) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        "Email Already Exists! Try Another One."
      );
    }
    updatePayload.email = payload.email;
  }

  if (payload.contactNumber) {
    const isExists = await prisma.user.findFirst({
      where: {
        contactNumber: payload.contactNumber,
      },
    });
    if (isExists) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        "Contact Number Already Exists! Try Another One."
      );
    }
    updatePayload.contactNumber = payload.contactNumber;
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: updatePayload,
  });

  const jwtPayload = {
    email: updatedUser?.email,
    id: updatedUser?.id,
  };

  const accessToken = jwtHelpers.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in
  );

  const refreshToken = jwtHelpers.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in
  );

  return {
    accessToken,
    refreshToken,
  };
};

const updatePassword = async (
  payload: IUpdatePassword,
  token: string
): Promise<null> => {
  const { id: userId } = jwtHelpers.jwtVerify(token, config.jwt_access_secret);

  const { currentPassword, newPassword, confirmPassword } = payload;

  const isExistsUser = await prisma.user.findFirst({ where: { id: userId } });
  if (!isExistsUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Not Found");
  }

  const isPassMatched = await bcrypt.compare(
    currentPassword,
    isExistsUser.password as string
  );

  if (!isPassMatched) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Incorrect current password. Please try again."
    );
  }

  const isPreviousPass = await bcrypt.compare(
    newPassword,
    isExistsUser.password as string
  );

  if (isPreviousPass || currentPassword === newPassword) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "New Password Cannot be The Previous Password"
    );
  }

  if (newPassword !== confirmPassword) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "New Password and Confirm Password must match."
    );
  }

  const pass = await bcrypt.hash(newPassword, Number(config.salt_round));
  isExistsUser.password = pass;

  await prisma.user.update({ where: { id: userId }, data: isExistsUser });

  return null;
};

const getAllUsers = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions,
  token: string
) => {
  const { id, email } = jwtHelpers.jwtVerify(token, config.jwt_access_secret);
  const isAdmin = await roleCheck(email, String(id), ["ADMIN"]);
  if (!isAdmin) {
    return [];
  }

  const { searchTerm, ...filterData } = filters;
  const AND: any[] = [];

  if (searchTerm) {
    AND.push({
      OR: UserSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })) as any,
    });
  }

  if (Object.keys(filterData).length > 0) {
    AND.push({
      ...filterData,
    });
  }

  const where: any = AND.length > 0 ? { AND } : {};

  const { page, limit, skip, sortBy, sortOrder } =
    calculatePaginationFunction(paginationOptions);

  const orderBy: Prisma.UserOrderByWithRelationInput | undefined =
    sortBy && sortOrder
      ? { [sortBy]: sortOrder.toLowerCase() as "asc" | "desc" }
      : undefined;

  const result = await prisma.user.findMany({
    where,
    skip,
    take: limit,
    orderBy,
    select: {
      id: true,
      userName: true,
      email: true,
      contactNumber: true,
      password: false,
      profileImage: true,
      location: true,
      activeStatus: true,
      IsFirstTimeUpdated: true,
      role: true,
      bio: true,
      interests: true,
      ratingCount: true,
      ratingAvg: true,
      accountStatus: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const total = await prisma.user.count({ where });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const deleteUser = async (token: string): Promise<null> => {
  const { id } = jwtHelpers.jwtVerify(token, config.jwt_access_secret);
  await prisma.$transaction(async (tx) => {
    // await tx.task.deleteMany({
    //   where: {
    //     userId: id,
    //   },
    // });

    const deletedUser = await tx.user.delete({
      where: { id },
    });

    if (!deletedUser) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
    }
  });

  return null;
};

const getPublicProfile = async (id: string): Promise<Partial<IUser> | null> => {
  const user = await prisma.user.findUnique({
    where: { id: id },
    select: {
      id: true,
      userName: true,
      email: true,
      contactNumber: true,
      password: false,
      profileImage: true,
      location: true,
      activeStatus: true,
      IsFirstTimeUpdated: true,
      role: true,
      bio: true,
      interests: true,
      ratingCount: true,
      ratingAvg: true,
      accountStatus: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
};

export const UserService = {
  register,
  login,
  getMe,
  logout,
  updateUser,
  updatePassword,
  getAllUsers,
  deleteUser,
  getPublicProfile,
};
