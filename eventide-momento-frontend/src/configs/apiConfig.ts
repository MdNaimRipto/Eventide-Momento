export const apiConfig = {
  // BASE_URL: "https://better-plate-backend.vercel.app/v1.0.0/apis",
  BASE_URL: "http://localhost:5000/v1.0.0/apis",
  USER: {
    REGISTER: "/users/register", // Done
    LOGIN: "/users/login", // Done
    GET: "/users/me", // Done
    LOGOUT: "/users/logout", // Done
    UPDATE_USER: "/users/updateUser", // Done
    UPDATE_PASSWORD: "/users/updatePassword", // Done
    GET_ALL: "/users/getAllUsers", // Done
    GET_PUBLIC_PROFILE: "/users/getPublicProfile", // Done
  },
  EVENTS: {
    CREATE: "/events", // Done
    GET_ALL: "/events", // Done
    DETAILS: "/events", // Done
    GET_HOST_EVENTS: "/events/host", // Done
    UPDATE: "/events", // Done
    DELETE: "/events", // Done
  },
  ORDER: {
    ORDER: "/payment/createPaymentLink", // Done
    GET_ALL: "/order/getAllOrders", // Done
    GET_USER: "/order/getUserOrders", // Done
  },
  REVIEWS: {
    ADD: "/reviews",
    GET_HOST_REVIEWS: "/reviews/host",
  },
  IMAGE: {
    UPLOAD: "/images/upload", // Done
    DELETE: "/images/delete", // Done
  },
};
