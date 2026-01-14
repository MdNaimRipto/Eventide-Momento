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
exports.ReviewController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const reviews_service_1 = require("./reviews.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const shared_1 = __importDefault(require("../../../shared/shared"));
const reviews_constant_1 = require("./reviews.constant");
const pagination_constant_1 = require("../../../constants/pagination.constant");
// Create Review
const createReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewInfo = __rest(req.body, []);
    const result = yield reviews_service_1.ReviewService.createReview(reviewInfo);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "Review Created Successfully",
        data: result,
    });
}));
// Get All Reviews
const getAllReviews = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, shared_1.default)(req.query, reviews_constant_1.ReviewFilterableFields);
    const paginationOptions = (0, shared_1.default)(req.query, pagination_constant_1.paginationFields);
    const result = yield reviews_service_1.ReviewService.getAllReviews(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Reviews Retrieved Successfully",
        data: result,
    });
}));
// Get Reviews by Host
const getReviewsByHost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { hostId } = req.params;
    const paginationOptions = (0, shared_1.default)(req.query, pagination_constant_1.paginationFields);
    const result = yield reviews_service_1.ReviewService.getReviewsByHost(hostId, paginationOptions);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Host Reviews Retrieved Successfully",
        data: result,
    });
}));
exports.ReviewController = {
    createReview,
    getAllReviews,
    getReviewsByHost,
};
