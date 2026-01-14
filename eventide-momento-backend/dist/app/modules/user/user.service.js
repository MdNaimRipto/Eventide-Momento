"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const prisma_1 = __importDefault(require("../../../config/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config/config"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const roleCheck_1 = require("../../../utils/roleCheck");
const user_constant_1 = require("./user.constant");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const register = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, contactNumber, password } = payload;
    const lowerCasedEmail = email.toLowerCase();
    const isEmailExists = yield prisma_1.default.user.findUnique({
        where: { email: lowerCasedEmail },
    });
    if (isEmailExists) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, "Email Already Exists!");
    }
    const isContactExists = yield prisma_1.default.user.findUnique({
        where: { contactNumber },
    });
    if (isContactExists) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, "Contact Number Already Exists!");
    }
    const hashedPass = yield bcrypt_1.default.hash(password, Number(config_1.default.salt_round));
    const user = yield prisma_1.default.user.create({
        data: {
            email: lowerCasedEmail,
            password: hashedPass,
            contactNumber: payload.contactNumber,
            userName: payload.userName,
        },
    });
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        // host: "smtp.office365.com",
        port: 587,
        secure: false,
        auth: {
            user: config_1.default.nodemailer_user,
            pass: config_1.default.nodemailer_pass,
        },
    });
    yield transporter.sendMail({
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
    const accessToken = jwtHelpers_1.jwtHelpers.createToken(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isExists = yield prisma_1.default.user.findUnique({
        where: { email },
    });
    if (!isExists) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid Email or Password!");
    }
    if (isExists.activeStatus === false) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Please Check Email And Verify Your Account First!");
    }
    const isPassMatched = yield bcrypt_1.default.compare(password, isExists.password);
    if (!isPassMatched) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid Email or Password!");
    }
    const jwtPayload = {
        email: isExists.email,
        id: isExists.id,
    };
    const accessToken = jwtHelpers_1.jwtHelpers.createToken(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const getMe = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, email } = jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_access_secret);
    const user = yield prisma_1.default.user.findUnique({
        where: {
            email: email.toLowerCase(),
            id,
        },
    });
    if (user) {
        const { password } = user, userWithoutPassword = __rest(user, ["password"]);
        return userWithoutPassword;
    }
    return null;
});
const logout = (res) => __awaiter(void 0, void 0, void 0, function* () {
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
});
const updateUser = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: userId } = jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_access_secret);
    const isExistsUser = yield prisma_1.default.user.findFirst({
        where: {
            id: userId,
        },
    });
    if (!isExistsUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User Not Found");
    }
    const { password } = payload, updatePayload = __rest(payload, ["password"]);
    if (isExistsUser.IsFirstTimeUpdated !== true) {
        payload.role !== undefined && (updatePayload.role = payload.role);
        payload.IsFirstTimeUpdated !== undefined &&
            (updatePayload.IsFirstTimeUpdated = payload.IsFirstTimeUpdated);
    }
    else {
        if (payload.role !== undefined) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Role Already has been update cannot be update again");
        }
        if (payload.IsFirstTimeUpdated !== undefined) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "First-time update flag cannot be modified");
        }
    }
    if (password !== undefined) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Permission Denied! Please Try Again.");
    }
    if (payload.email) {
        const isExists = yield prisma_1.default.user.findFirst({
            where: { email: payload.email },
        });
        if (isExists) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Email Already Exists! Try Another One.");
        }
        updatePayload.email = payload.email;
    }
    if (payload.contactNumber) {
        const isExists = yield prisma_1.default.user.findFirst({
            where: {
                contactNumber: payload.contactNumber,
            },
        });
        if (isExists) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Contact Number Already Exists! Try Another One.");
        }
        updatePayload.contactNumber = payload.contactNumber;
    }
    const updatedUser = yield prisma_1.default.user.update({
        where: { id: userId },
        data: updatePayload,
    });
    const jwtPayload = {
        email: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.email,
        id: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.id,
    };
    const accessToken = jwtHelpers_1.jwtHelpers.createToken(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const updatePassword = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: userId } = jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_access_secret);
    const { currentPassword, newPassword, confirmPassword } = payload;
    const isExistsUser = yield prisma_1.default.user.findFirst({ where: { id: userId } });
    if (!isExistsUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User Not Found");
    }
    const isPassMatched = yield bcrypt_1.default.compare(currentPassword, isExistsUser.password);
    if (!isPassMatched) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Incorrect current password. Please try again.");
    }
    const isPreviousPass = yield bcrypt_1.default.compare(newPassword, isExistsUser.password);
    if (isPreviousPass || currentPassword === newPassword) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "New Password Cannot be The Previous Password");
    }
    if (newPassword !== confirmPassword) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "New Password and Confirm Password must match.");
    }
    const pass = yield bcrypt_1.default.hash(newPassword, Number(config_1.default.salt_round));
    isExistsUser.password = pass;
    yield prisma_1.default.user.update({ where: { id: userId }, data: isExistsUser });
    return null;
});
const getAllUsers = (filters, paginationOptions, token) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, email } = jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_access_secret);
    const isAdmin = yield (0, roleCheck_1.roleCheck)(email, String(id), ["ADMIN"]);
    if (!isAdmin) {
        return [];
    }
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const AND = [];
    if (searchTerm) {
        AND.push({
            OR: user_constant_1.UserSearchableFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        AND.push(Object.assign({}, filterData));
    }
    const where = AND.length > 0 ? { AND } : {};
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelpers_1.calculatePaginationFunction)(paginationOptions);
    const orderBy = sortBy && sortOrder
        ? { [sortBy]: sortOrder.toLowerCase() }
        : undefined;
    const result = yield prisma_1.default.user.findMany({
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
    const total = yield prisma_1.default.user.count({ where });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const deleteUser = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_access_secret);
    yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        // await tx.task.deleteMany({
        //   where: {
        //     userId: id,
        //   },
        // });
        const deletedUser = yield tx.user.delete({
            where: { id },
        });
        if (!deletedUser) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
        }
    }));
    return null;
});
const getPublicProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
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
});
exports.UserService = {
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
