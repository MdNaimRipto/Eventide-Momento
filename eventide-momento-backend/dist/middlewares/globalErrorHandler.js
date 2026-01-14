"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const library_1 = require("@prisma/client/runtime/library");
const globalErrorHandler = (error, req, res, next) => {
    var _a, _b;
    config_1.default.node_env === "development"
        ? console.log(`GlobalErrorHandler~~`, error)
        : console.error(`GlobalErrorHandler~~`, error);
    let statusCode = 500;
    let message = "Internal Server Error!";
    let errorMessages = [];
    if (error instanceof library_1.PrismaClientValidationError) {
        statusCode = 400;
        message = "Validation Error";
        errorMessages;
    } //
    else if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    } //
    else if (error instanceof ApiError_1.default) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: "",
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    } //
    else if (error instanceof library_1.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
            // Unique constraint failed
            statusCode = 409;
            message = "Duplicate field value";
            errorMessages = [
                {
                    path: ((_b = (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target) === null || _b === void 0 ? void 0 : _b.join(", ")) || "",
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
    }
    else if (error instanceof Error) {
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: "",
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    res.status(statusCode).send({
        success: false,
        statusCode,
        message,
        errorMessages,
        stack: config_1.default.node_env === "production" ? undefined : error === null || error === void 0 ? void 0 : error.stack,
    });
};
exports.default = globalErrorHandler;
