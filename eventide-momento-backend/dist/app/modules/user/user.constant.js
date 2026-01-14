"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFilterableFields = exports.UserSearchableFields = exports.AccountStatusEnums = exports.RoleEnums = void 0;
exports.RoleEnums = ["USER", "ADMIN", "HOST"];
exports.AccountStatusEnums = ["ACTIVE", "FREEZE"];
exports.UserSearchableFields = ["userName", "email"];
exports.UserFilterableFields = [
    "searchTerm",
    "userName",
    "email",
    "accountStatus",
    "role",
];
