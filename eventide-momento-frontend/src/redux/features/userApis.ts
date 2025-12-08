import { apiConfig } from "@/configs/apiConfig";
import { apiSlice } from "../apis/apiSlice";

export const userApis = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //
    // * Register
    //
    register: builder.mutation({
      query: ({ data }) => ({
        url: apiConfig.USER.REGISTER,
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        data: JSON.stringify(data),
      }),
      invalidatesTags: ["USER"],
    }),
    //
    // * Login
    //
    login: builder.mutation({
      query: ({ data }: { data: { email: string; password: string } }) => ({
        url: apiConfig.USER.LOGIN,
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        data: JSON.stringify(data),
      }),
      invalidatesTags: ["USER"],
    }),
    //
    // * Get Info
    //
    userInfo: builder.query({
      query: () => ({
        url: apiConfig.USER.GET,
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    //
    // * Logout
    //
    logout: builder.mutation({
      query: () => ({
        url: apiConfig.USER.LOGOUT,
        method: "POST",
      }),
      invalidatesTags: ["USER"],
    }),
    //
    // * update User
    //
    updateUser: builder.mutation({
      query: ({ data }) => ({
        url: apiConfig.USER.UPDATE_USER,
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        data: JSON.stringify(data),
      }),
      invalidatesTags: ["USER"],
    }),
    //
    // * update Password
    //
    updatePassword: builder.mutation({
      query: ({ data }) => ({
        url: apiConfig.USER.UPDATE_PASSWORD,
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        data: JSON.stringify(data),
      }),
      invalidatesTags: [],
    }),
    //
    // * Get All
    //
    getAllUsers: builder.query({
      query: ({
        searchTerm,
        role,
      }: { searchTerm?: string; role?: string } = {}) => {
        // Build query string dynamically
        const params = new URLSearchParams();

        if (searchTerm) params.append("searchTerm", searchTerm);
        if (role) params.append("role", role);

        const queryString = params.toString();
        return {
          url: `${apiConfig.USER.GET_ALL}${
            queryString ? `?${queryString}` : ""
          }`,
          method: "GET",
        };
      },
      providesTags: ["USER"],
    }),
    //
    // * Get Public Profile
    //
    getPublicProfile: builder.query({
      query: (id) => ({
        url: apiConfig.USER.GET_PUBLIC_PROFILE + `/${id}`,
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useUserInfoQuery,
  useLogoutMutation,
  useUpdateUserMutation,
  useUpdatePasswordMutation,
  useGetAllUsersQuery,
  useGetPublicProfileQuery,
} = userApis;
