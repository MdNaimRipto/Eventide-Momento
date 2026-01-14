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
exports.EventService = exports.deleteEvent = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const events_constant_1 = require("./events.constant");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config/config"));
const roleCheck_1 = require("../../../utils/roleCheck");
const prisma_1 = __importDefault(require("../../../config/prisma"));
const images_service_1 = require("../images/images.service");
const Events = prisma_1.default.event;
// Create Event
const createEvent = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { id, email } = jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_access_secret);
    const isAdminOrHost = yield (0, roleCheck_1.roleCheck)(email, String(id), ["ADMIN", "HOST"]);
    if (!isAdminOrHost) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "This account has no access to upload event!");
    }
    const event = yield Events.create({
        data: {
            eventName: payload.eventName,
            description: payload.description,
            eventDate: payload.eventDate,
            category: payload.category,
            entryFee: (_a = payload.entryFee) !== null && _a !== void 0 ? _a : 0,
            location: payload.location,
            banner: payload.banner,
            minParticipants: (_b = payload.minParticipants) !== null && _b !== void 0 ? _b : 0,
            maxParticipants: (_c = payload.maxParticipants) !== null && _c !== void 0 ? _c : 0,
            detailedInformations: payload.detailedInformations,
            host: {
                connect: { id: String(id) },
            },
        },
    });
    if (!event) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create event");
    }
    return null;
});
// Get All Events
const getAllEvents = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const AND = [];
    if (searchTerm) {
        AND.push({
            OR: events_constant_1.EventSearchableFields.map((field) => ({
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
    console.log(where);
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelpers_1.calculatePaginationFunction)(paginationOptions);
    const orderBy = sortBy && sortOrder
        ? { [sortBy]: sortOrder.toLowerCase() }
        : undefined;
    const result = yield prisma_1.default.event.findMany({
        where,
        skip,
        take: limit,
        orderBy,
    });
    const total = yield prisma_1.default.event.count({ where });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// Get Single Event
const getEventDetails = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield Events.findUnique({
        where: { id },
        include: {
            host: {
                select: {
                    userName: true,
                    email: true,
                    createdAt: true,
                    profileImage: true,
                },
            },
        },
    });
    return event;
});
// Update Event
const updateEvent = (id, payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: uid, email } = jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_access_secret);
    const isAdminOrHost = yield (0, roleCheck_1.roleCheck)(email, String(uid), ["ADMIN", "HOST"]);
    if (!isAdminOrHost) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "This account has no access to upload event!");
    }
    const event = yield Events.update({
        where: {
            id: id,
        },
        data: payload,
    });
    if (!event) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Event not found");
    }
    return null;
});
// Delete Event
const deleteEvent = (id, token) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: uid, email } = jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_access_secret);
    const isAdminOrHost = yield (0, roleCheck_1.roleCheck)(email, String(uid), ["ADMIN", "HOST"]);
    if (!isAdminOrHost) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "This account has no access to delete event!");
    }
    yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        // 1. Check if event exists
        const event = yield tx.event.findUnique({ where: { id } });
        if (!event) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Event not found");
        }
        // 2. Delete the image from Cloudinary (outside of DB but logically part of transaction)
        if (event.banner) {
            yield images_service_1.ImageService.deleteImage({
                publicId: event.banner, // better to send URL and let service extract publicId
            });
        }
        // 3. Delete the event
        yield tx.event.delete({ where: { id } });
    }));
    return null;
});
exports.deleteEvent = deleteEvent;
// Get Events by Host
const getEventsByHost = (paginationOptions, hostId) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelpers_1.calculatePaginationFunction)(paginationOptions);
    const orderBy = sortBy && sortOrder
        ? { [sortBy]: sortOrder.toLowerCase() }
        : undefined;
    const where = {
        hostId,
    };
    const result = yield prisma_1.default.event.findMany({
        where,
        skip,
        take: limit,
        orderBy,
    });
    const total = yield prisma_1.default.event.count({ where });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
exports.EventService = {
    createEvent,
    getAllEvents,
    getEventDetails,
    updateEvent,
    deleteEvent: exports.deleteEvent,
    getEventsByHost,
};
