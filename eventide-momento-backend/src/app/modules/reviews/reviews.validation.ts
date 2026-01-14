import { z } from "zod";

const createReviewZodSchema = z.object({
  body: z.object({
    userId: z.string({
      error: "User ID is Required",
    }),
    hostId: z.string({
      error: "Host ID is Required",
    }),
    review: z.string({
      error: "Review is Required",
    }),
    rating: z
      .number({
        error: "Rating is Required",
      })
      .min(1, "Rating must be at least 1")
      .max(5, "Rating must not exceed 5"),
  }),
});

export const ReviewValidation = {
  createReviewZodSchema,
};
