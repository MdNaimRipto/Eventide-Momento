import { apiConfig } from "@/configs/apiConfig";
import { apiSlice } from "../apis/apiSlice";

export const imageApis = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //
    // * Upload Image
    //
    uploadImage: builder.mutation<{ url: string }, FormData>({
      query: (formData) => ({
        url: apiConfig.IMAGE.UPLOAD,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useUploadImageMutation } = imageApis;
