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
exports.OrderService = void 0;
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const order_constant_1 = require("./order.constant");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config/config"));
const prisma_1 = __importDefault(require("../../../config/prisma"));
const Orders = prisma_1.default.order;
const getAllOrders = (filters, paginationOptions, accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    // verify token
    jwtHelpers_1.jwtHelpers.jwtVerify(accessToken, config_1.default.jwt_access_secret);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const AND = [];
    if (searchTerm) {
        AND.push({
            OR: order_constant_1.OrderSearchableFields.map((field) => ({
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
    const result = yield Orders.findMany({
        where,
        skip,
        take: limit,
        orderBy,
    });
    const total = yield Orders.count({ where });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getUserOrders = (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = jwtHelpers_1.jwtHelpers.jwtVerify(accessToken, config_1.default.jwt_access_secret);
    const result = yield Orders.findMany({
        where: { userId: id },
        include: {
            event: true,
        },
    });
    return result;
});
const updateOrder = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Orders.update({
        where: {
            id: id,
        },
        data: payload,
    });
    return result;
});
const getOrdersOverview = (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = jwtHelpers_1.jwtHelpers.jwtVerify(accessToken, config_1.default.jwt_access_secret);
    // total orders for this host
    const totalOrders = yield Orders.count({
        where: { hostId: id },
    });
    // total revenue for this host
    const totalRevenueResult = yield Orders.aggregate({
        _sum: {
            paidAmount: true,
        },
        where: {
            hostId: id,
        },
    });
    const totalAmount = totalRevenueResult._sum.paidAmount || 0;
    return {
        totalOrders,
        totalAmount,
    };
});
exports.OrderService = {
    getAllOrders,
    getUserOrders,
    updateOrder,
    getOrdersOverview,
};
