import express from "express";
import { UserController } from "./user.controller";
import zodValidationRequest from "../../../middlewares/zodValidationRequest";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/register",
  zodValidationRequest(UserValidation.usersZodSchema),
  UserController.register
);

router.post(
  "/login",
  zodValidationRequest(UserValidation.loginUserZodSchema),
  UserController.login
);

router.get("/me", UserController.getMe);

router.post("/logout", UserController.logout);

router.patch(
  "/updateUser",
  zodValidationRequest(UserValidation.userUpdateZodSchema),
  UserController.updatedUser
);

router.patch(
  "/updatePassword",
  zodValidationRequest(UserValidation.updatePasswordZodSchema),
  UserController.updatePassword
);

router.get("/getAllUsers", UserController.getAllUsers);

router.delete("/deleteUser", UserController.deleteUser);

router.get("/getPublicProfile/:id", UserController.getPublicProfile);

export const UserRouter = router;
