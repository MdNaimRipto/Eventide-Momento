import { apiConfig } from "@/configs/apiConfig";
import { apiSlice } from "../apis/apiSlice";

export const imageApis = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //
    // Delete Image
    //
    deleteImage: builder.mutation({
      query: ({ data: res }: { data: { publicId: string } }) => ({
        url: `${apiConfig.IMAGE.DELETE}`,
        method: "POST",
        data: { publicId: res.publicId },
      }),
      invalidatesTags: [],
    }),
  }),
});

export const { useDeleteImageMutation } = imageApis;
