"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventValidation = void 0;
const zod_1 = require("zod");
const events_constant_1 = require("./events.constant");
const createEventZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        eventName: zod_1.z.string({
            error: "Event Name is Required",
        }),
        description: zod_1.z.string({
            error: "Description is Required",
        }),
        eventDate: zod_1.z.string({
            error: "Event Date is Required",
        }),
        category: zod_1.z.enum(events_constant_1.EventCategoryEnums, {
            error: "Category is Required",
        }),
        entryFee: zod_1.z.number().optional(),
        totalParticipants: zod_1.z.number().optional(),
        detailedInformations: zod_1.z.array(zod_1.z.string()).optional(),
        location: zod_1.z.string({
            error: "Location is Required",
        }),
        banner: zod_1.z.string({
            error: "Banner is Required",
        }),
        minParticipants: zod_1.z.number().optional(),
        maxParticipants: zod_1.z.number().optional(),
    }),
});
const updateEventZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        eventName: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        eventDate: zod_1.z.string().optional(),
        category: zod_1.z
            .enum(events_constant_1.EventCategoryEnums)
            .optional(),
        status: zod_1.z.string().optional(),
        entryFee: zod_1.z.number().optional(),
        totalParticipants: zod_1.z.number().optional(),
        detailedInformations: zod_1.z.array(zod_1.z.string()).optional(),
        location: zod_1.z.string().optional(),
        banner: zod_1.z.string().optional(),
        minParticipants: zod_1.z.number().optional(),
        maxParticipants: zod_1.z.number().optional(),
    }),
});
exports.EventValidation = {
    createEventZodSchema,
    updateEventZodSchema,
};
