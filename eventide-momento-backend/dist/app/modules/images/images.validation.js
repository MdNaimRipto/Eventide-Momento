"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageValidation = void 0;
const zod_1 = require("zod");
const uploadImageZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        filePath: zod_1.z.string({
            error: "File path is Required",
        }),
    }),
});
exports.ImageValidation = {
    uploadImageZodSchema,
};
