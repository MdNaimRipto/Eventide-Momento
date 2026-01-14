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
exports.ReviewService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const reviews_constant_1 = require("./reviews.constant");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const prisma_1 = __importDefault(require("../../../config/prisma"));
const Reviews = prisma_1.default.review;
// Create Review
const createReview = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield Reviews.create({
        data: {
            hostId: payload.hostId,
            rating: payload.rating,
            review: payload.review,
            userId: payload.userId,
        },
    });
    if (!review) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create review");
    }
    return review;
});
// Get All Reviews
const getAllReviews = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const AND = [];
    if (searchTerm) {
        AND.push({
            OR: reviews_constant_1.ReviewSearchableFields.map((field) => ({
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
    const result = yield Reviews.findMany({
        where,
        skip,
        take: limit,
        orderBy,
    });
    const total = yield Reviews.count({ where });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// Get Reviews by Host
const getReviewsByHost = (hostId, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelpers_1.calculatePaginationFunction)(paginationOptions);
    const where = {
        hostId,
    };
    const orderBy = sortBy && sortOrder
        ? { [sortBy]: sortOrder.toLowerCase() }
        : undefined;
    const result = yield Reviews.findMany({
        where,
        skip,
        take: limit,
        orderBy,
    });
    const total = yield Reviews.count({ where });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
exports.ReviewService = {
    createReview,
    getAllReviews,
    getReviewsByHost,
};
