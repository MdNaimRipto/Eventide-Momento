"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
const createReviewZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            error: "User ID is Required",
        }),
        hostId: zod_1.z.string({
            error: "Host ID is Required",
        }),
        review: zod_1.z.string({
            error: "Review is Required",
        }),
        rating: zod_1.z
            .number({
            error: "Rating is Required",
        })
            .min(1, "Rating must be at least 1")
            .max(5, "Rating must not exceed 5"),
    }),
});
exports.ReviewValidation = {
    createReviewZodSchema,
};
