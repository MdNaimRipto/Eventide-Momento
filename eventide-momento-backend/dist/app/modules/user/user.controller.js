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
exports.UserController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const user_service_1 = require("./user.service");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const shared_1 = __importDefault(require("../../../shared/shared"));
const user_constant_1 = require("./user.constant");
const pagination_constant_1 = require("../../../constants/pagination.constant");
const register = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = __rest(req.body, []);
    const result = yield user_service_1.UserService.register(userInfo);
    (0, jwtHelpers_1.setAuthCookie)(res, result);
    (0, sendResponse_1.default)(res, {
        message: "Registration Successful",
        data: result,
    });
}));
const login = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = __rest(req.body, []);
    const result = yield user_service_1.UserService.login(userInfo);
    (0, jwtHelpers_1.setAuthCookie)(res, result);
    (0, sendResponse_1.default)(res, {
        message: "Login Successful",
        data: result,
    });
}));
const getMe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = jwtHelpers_1.jwtHelpers.verifyAuthToken(req);
    const result = yield user_service_1.UserService.getMe(token);
    (0, sendResponse_1.default)(res, {
        message: "User Details Retrieved Successfully",
        data: result,
    });
}));
const logout = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_service_1.UserService.logout(res);
    (0, sendResponse_1.default)(res, {
        message: "User Logged Out Successfully",
        data: null,
    });
}));
const updatedUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = __rest(req.body, []);
    const token = jwtHelpers_1.jwtHelpers.verifyAuthToken(req);
    const result = yield user_service_1.UserService.updateUser(payload, token);
    (0, jwtHelpers_1.setAuthCookie)(res, result);
    (0, sendResponse_1.default)(res, {
        message: "User Updated Successfully",
        data: result,
    });
}));
const updatePassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = __rest(req.body, []);
    const token = jwtHelpers_1.jwtHelpers.verifyAuthToken(req);
    const result = yield user_service_1.UserService.updatePassword(payload, token);
    (0, sendResponse_1.default)(res, {
        message: "User Updated Successfully",
        data: result,
    });
}));
const getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, shared_1.default)(req.query, user_constant_1.UserFilterableFields);
    const options = (0, shared_1.default)(req.query, pagination_constant_1.paginationFields);
    const token = jwtHelpers_1.jwtHelpers.verifyAuthToken(req);
    const result = yield user_service_1.UserService.getAllUsers(filters, options, token);
    (0, sendResponse_1.default)(res, {
        message: "Users Retrieved Successfully",
        data: result,
    });
}));
const deleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = jwtHelpers_1.jwtHelpers.verifyAuthToken(req);
    const result = yield user_service_1.UserService.deleteUser(token);
    (0, sendResponse_1.default)(res, {
        message: "User Deleted Successfully",
        data: result,
    });
}));
const getPublicProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield user_service_1.UserService.getPublicProfile(id);
    (0, sendResponse_1.default)(res, {
        message: "Public Profile Retrieved Successfully",
        data: result,
    });
}));
exports.UserController = {
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
