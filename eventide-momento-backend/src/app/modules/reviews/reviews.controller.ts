import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ReviewService } from "./reviews.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/shared";
import { ReviewFilterableFields } from "./reviews.constant";
import { paginationFields } from "../../../constants/pagination.constant";

// Create Review
const createReview = catchAsync(async (req: Request, res: Response) => {
  const { ...reviewInfo } = req.body;

  const result = await ReviewService.createReview(reviewInfo);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Review Created Successfully",
    data: result,
  });
});

// Get All Reviews
const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ReviewFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ReviewService.getAllReviews(filters, paginationOptions);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Reviews Retrieved Successfully",
    data: result,
  });
});

// Get Reviews by Host
const getReviewsByHost = catchAsync(async (req: Request, res: Response) => {
  const { hostId } = req.params;
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ReviewService.getReviewsByHost(
    hostId,
    paginationOptions,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Host Reviews Retrieved Successfully",
    data: result,
  });
});

export const ReviewController = {
  createReview,
  getAllReviews,
  getReviewsByHost,
};
