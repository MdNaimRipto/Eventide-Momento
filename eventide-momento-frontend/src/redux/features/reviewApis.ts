import { apiConfig } from "@/configs/apiConfig";
import { apiSlice } from "../apis/apiSlice";
import { IReviews } from "@/types/reviews.types";

const reviewApis = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //
    // * Add Review
    //
    addReview: builder.mutation({
      query: ({ data }: { data: IReviews }) => ({
        url: apiConfig.REVIEWS.ADD,
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        data: JSON.stringify(data),
      }),
      invalidatesTags: ["REVIEWS"],
    }),
    //
    // Get all reviews
    //
    getReviews: builder.query({
      query: ({ reviewForId }: { reviewForId: string }) => ({
        url: apiConfig.REVIEWS.GET_HOST_REVIEWS + `/${reviewForId}`,
      }),
      providesTags: ["REVIEWS"],
    }),
  }),
});

export const { useAddReviewMutation, useGetReviewsQuery } = reviewApis;
