"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const usersZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userName: zod_1.z.string({
            error: "User Name is Required",
        }),
        email: zod_1.z.string({
            error: "Email is Required",
        }),
        contactNumber: zod_1.z.string({
            error: "Contact Number is Required",
        }),
        password: zod_1.z.string({
            error: "Password is Required",
        }),
    }),
});
const loginUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            error: "Email is Required",
        }),
        password: zod_1.z.string({
            error: "Password is Required",
        }),
    }),
});
const userUpdateZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userName: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        contactNumber: zod_1.z.string().optional(),
        profileImage: zod_1.z.string().optional(),
        bio: zod_1.z.string().optional(),
        interests: zod_1.z.array(zod_1.z.string()).optional(),
        location: zod_1.z.string().optional(), // matches your schema default "Not Updated Yet"
        accountStatus: zod_1.z.string().optional(),
    }),
});
const updatePasswordZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        currentPassword: zod_1.z.string({
            error: "Current Password is Required",
        }),
        newPassword: zod_1.z.string({
            error: "New Password is Required",
        }),
        confirmPassword: zod_1.z.string({
            error: "Confirm Password is Required",
        }),
    }),
});
exports.UserValidation = {
    usersZodSchema,
    loginUserZodSchema,
    userUpdateZodSchema,
    updatePasswordZodSchema,
};
