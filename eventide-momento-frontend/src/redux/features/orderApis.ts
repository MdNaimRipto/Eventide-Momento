import { apiConfig } from "@/configs/apiConfig";
import { apiSlice } from "../apis/apiSlice";

export const orderApis = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //
    // * Place Order
    //
    placeOrder: builder.mutation({
      query: ({ data }) => ({
        url: apiConfig.ORDER.ORDER,
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        data: JSON.stringify(data),
      }),
      invalidatesTags: ["ORDER"],
    }),
    //
    // * Get All
    //
    getAllOrders: builder.query({
      query: () => ({
        url: apiConfig.ORDER.GET_ALL,
        method: "GET",
      }),
      providesTags: ["ORDER"],
    }),
    //
    // * Get User Orders
    //
    getUserOrders: builder.query({
      query: () => ({
        url: apiConfig.ORDER.GET_USER,
        method: "GET",
      }),
      providesTags: ["ORDER"],
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useGetAllOrdersQuery,
  useGetUserOrdersQuery,
} = orderApis;
