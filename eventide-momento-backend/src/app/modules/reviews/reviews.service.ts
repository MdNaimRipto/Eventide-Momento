import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IReview, IReviewFilters } from "./reviews.interface";
import { IPaginationOptions } from "../../../interface/pagination";
import { ReviewSearchableFields } from "./reviews.constant";
import { calculatePaginationFunction } from "../../../helpers/paginationHelpers";
import prisma from "../../../config/prisma";
import { Prisma } from "@prisma/client";

const Reviews = prisma.review;

// Create Review
const createReview = async (payload: IReview): Promise<IReview> => {
  const review = await Reviews.create({
    data: {
      hostId: payload.hostId,
      rating: payload.rating,
      review: payload.review,
      userId: payload.userId,
    },
  });

  if (!review) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create review");
  }

  return review;
};

// Get All Reviews
const getAllReviews = async (
  filters: IReviewFilters,
  paginationOptions: IPaginationOptions
) => {
  const { searchTerm, ...filterData } = filters;
  const AND: any[] = [];

  if (searchTerm) {
    AND.push({
      OR: ReviewSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })) as any,
    });
  }

  if (Object.keys(filterData).length > 0) {
    AND.push({
      ...filterData,
    });
  }

  const where: any = AND.length > 0 ? { AND } : {};

  const { page, limit, skip, sortBy, sortOrder } =
    calculatePaginationFunction(paginationOptions);

  const orderBy: Prisma.ReviewOrderByWithRelationInput | undefined =
    sortBy && sortOrder
      ? { [sortBy]: sortOrder.toLowerCase() as "asc" | "desc" }
      : undefined;

  const result = await Reviews.findMany({
    where,
    skip,
    take: limit,
    orderBy,
  });

  const total = await Reviews.count({ where });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Get Reviews by Host
const getReviewsByHost = async (
  hostId: string,
  paginationOptions: IPaginationOptions
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePaginationFunction(paginationOptions);

  const where = {
    hostId,
  };

  const orderBy: Prisma.ReviewOrderByWithRelationInput | undefined =
    sortBy && sortOrder
      ? { [sortBy]: sortOrder.toLowerCase() as "asc" | "desc" }
      : undefined;

  const result = await Reviews.findMany({
    where,
    skip,
    take: limit,
    orderBy,
  });

  const total = await Reviews.count({ where });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const ReviewService = {
  createReview,
  getAllReviews,
  getReviewsByHost,
};
