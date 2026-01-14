/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import config from "../config/config";
import { IGenericErrorMessages } from "../interface/error";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import ApiError from "../errors/ApiError";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  config.node_env === "development"
    ? console.log(`GlobalErrorHandler~~`, error)
    : console.error(`GlobalErrorHandler~~`, error);

  let statusCode = 500;
  let message = "Internal Server Error!";
  let errorMessages: IGenericErrorMessages[] = [];

  if (error instanceof PrismaClientValidationError) {
    statusCode = 400;
    message = "Validation Error";
    errorMessages;
  } //
  else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } //
  else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  } //
  else if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      // Unique constraint failed
      statusCode = 409;
      message = "Duplicate field value";
      errorMessages = [
        {
          path: (error.meta?.target as string[])?.join(", ") || "",
          message: "Already exists",
        },
      ];
    } //
    else if (error.code === "P2025") {
      // Record not found
      statusCode = 404;
      message = "Record not found";
      errorMessages = [
        {
          path: "",
          message: error.message,
        },
      ];
    }
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).send({
    success: false,
    statusCode,
    message,
    errorMessages,
    stack: config.node_env === "production" ? undefined : error?.stack,
  });
};

export default globalErrorHandler;
