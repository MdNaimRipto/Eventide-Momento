/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiConfig } from "@/configs/apiConfig";
import { apiSlice } from "../apis/apiSlice";

export const eventApis = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create Event
    createEvent: builder.mutation({
      query: ({ data }) => ({
        url: apiConfig.EVENTS.CREATE,
        method: "POST",
        headers: { "content-type": "application/json" },
        data: JSON.stringify(data),
      }),
      invalidatesTags: ["EVENTS"],
    }),

    // Get All Events (with optional filters)
    getAllEvents: builder.query({
      query: ({
        searchTerm,
        category,
        status,
        hostId,
      }: {
        searchTerm?: string;
        category?: string;
        status?: string;
        hostId?: string;
      } = {}) => {
        const params = new URLSearchParams();
        if (searchTerm) params.append("searchTerm", searchTerm);
        if (category) params.append("category", category);
        if (status) params.append("status", status);
        if (hostId) params.append("hostId", hostId);

        const queryString = params.toString();
        return {
          url: `${apiConfig.EVENTS.GET_ALL}${
            queryString ? `?${queryString}` : ""
          }`,
          method: "GET",
        };
      },
      providesTags: ["EVENTS"],
    }),

    // Get Event Details
    getEventDetails: builder.query({
      query: (id: string) => ({
        url: `${apiConfig.EVENTS.DETAILS}/${id}`,
        method: "GET",
      }),
      providesTags: ["EVENTS"],
    }),

    // Get Host Events
    getHostEvents: builder.query({
      query: ({
        searchTerm,
        category,
        status,
        hostId,
      }: {
        searchTerm?: string;
        category?: string;
        status?: string;
        hostId?: string;
      } = {}) => {
        const params = new URLSearchParams();
        if (searchTerm) params.append("searchTerm", searchTerm);
        if (category) params.append("category", category);
        if (status) params.append("status", status);
        if (hostId) params.append("hostId", hostId);

        const queryString = params.toString();
        return {
          url: `${apiConfig.EVENTS.GET_HOST_EVENTS}${
            queryString ? `?${queryString}` : ""
          }`,
          method: "GET",
        };
      },
      providesTags: ["EVENTS"],
    }),

    // Update Event
    updateEvent: builder.mutation({
      query: ({ id, data }: { id: string; data: any }) => ({
        url: `${apiConfig.EVENTS.UPDATE}/${id}`,
        method: "PATCH",
        headers: { "content-type": "application/json" },
        data: JSON.stringify(data),
      }),
      invalidatesTags: ["EVENTS"],
    }),

    // Delete Event
    deleteEvent: builder.mutation({
      query: (id: string) => ({
        url: `${apiConfig.EVENTS.DELETE}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EVENTS"],
    }),
  }),
});

export const {
  useCreateEventMutation,
  useGetAllEventsQuery,
  useGetEventDetailsQuery,
  useGetHostEventsQuery,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventApis;

export default eventApis;
