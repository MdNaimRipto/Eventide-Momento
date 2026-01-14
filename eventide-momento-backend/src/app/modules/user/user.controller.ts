import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { UserService } from "./user.service";
import { jwtHelpers, setAuthCookie } from "../../../helpers/jwtHelpers";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/shared";
import { UserFilterableFields } from "./user.constant";
import { paginationFields } from "../../../constants/pagination.constant";

const register = catchAsync(async (req: Request, res: Response) => {
  const { ...userInfo } = req.body;

  const result = await UserService.register(userInfo);

  setAuthCookie(res, result);

  sendResponse(res, {
    message: "Registration Successful",
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { ...userInfo } = req.body;

  const result = await UserService.login(userInfo);

  setAuthCookie(res, result);

  sendResponse(res, {
    message: "Login Successful",
    data: result,
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const token = jwtHelpers.verifyAuthToken(req);

  const result = await UserService.getMe(token);

  sendResponse(res, {
    message: "User Details Retrieved Successfully",
    data: result,
  });
});

const logout = catchAsync(async (req: Request, res: Response) => {
  await UserService.logout(res);

  sendResponse(res, {
    message: "User Logged Out Successfully",
    data: null,
  });
});

const updatedUser = catchAsync(async (req: Request, res: Response) => {
  const { ...payload } = req.body;
  const token = jwtHelpers.verifyAuthToken(req);

  const result = await UserService.updateUser(payload, token);

  setAuthCookie(res, result);

  sendResponse(res, {
    message: "User Updated Successfully",
    data: result,
  });
});

const updatePassword = catchAsync(async (req: Request, res: Response) => {
  const { ...payload } = req.body;
  const token = jwtHelpers.verifyAuthToken(req);

  const result = await UserService.updatePassword(payload, token);

  sendResponse(res, {
    message: "User Updated Successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, UserFilterableFields);
  const options = pick(req.query, paginationFields);
  const token = jwtHelpers.verifyAuthToken(req);

  const result = await UserService.getAllUsers(filters, options, token);
  sendResponse(res, {
    message: "Users Retrieved Successfully",
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const token = jwtHelpers.verifyAuthToken(req);
  const result = await UserService.deleteUser(token);
  sendResponse(res, {
    message: "User Deleted Successfully",
    data: result,
  });
});

const getPublicProfile = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.getPublicProfile(id);
  sendResponse(res, {
    message: "Public Profile Retrieved Successfully",
    data: result,
  });
});

export const UserController = {
  register,
  login,
  getMe,
  logout,
  updatedUser,
  updatePassword,
  getAllUsers,
  deleteUser,
  getPublicProfile,
};
