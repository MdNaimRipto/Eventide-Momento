"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const sendResponse = (res, data) => {
    res.status(http_status_1.default.OK).send({
        success: data.success || true,
        statusCode: data.statusCode || http_status_1.default.OK,
        message: data.message,
        data: data.data || null,
    });
};
exports.default = sendResponse;
