"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventFilterableFields = exports.EventSearchableFields = exports.EventCategoryEnums = exports.EventStatusEnums = void 0;
exports.EventStatusEnums = [
    "UPCOMING",
    "ONGOING",
    "COMPLETED",
    "CANCELED",
];
exports.EventCategoryEnums = [
    "SPORTS",
    "MUSIC",
    "TECHNOLOGY",
    "BUSINESS",
    "ARTS",
    "EDUCATION",
    "SOCIAL",
];
exports.EventSearchableFields = ["eventName", "location", "category"];
exports.EventFilterableFields = [
    "searchTerm",
    "category",
    "status",
    "hostId",
];
