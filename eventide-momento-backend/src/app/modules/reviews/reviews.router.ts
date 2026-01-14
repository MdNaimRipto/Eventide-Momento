import express from "express";
import { ReviewController } from "./reviews.controller";
import zodValidationRequest from "../../../middlewares/zodValidationRequest";
import { ReviewValidation } from "./reviews.validation";

const router = express.Router();

router.post(
  "/",
  zodValidationRequest(ReviewValidation.createReviewZodSchema),
  ReviewController.createReview,
);

router.get("/", ReviewController.getAllReviews);

router.get("/host/:hostId", ReviewController.getReviewsByHost);

export const ReviewRouter = router;
