import { z } from "zod";

const uploadImageZodSchema = z.object({
  body: z.object({
    filePath: z.string({
      error: "File path is Required",
    }),
  }),
});

export const ImageValidation = {
  uploadImageZodSchema,
};
