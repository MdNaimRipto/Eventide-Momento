export const apiConfig = {
  // BASE_URL: "https://better-plate-backend.vercel.app/v1.0.0/apis",
  BASE_URL: "http://localhost:5000/v1.0.0/apis",
  USER: {
    REGISTER: "/users/register",
    LOGIN: "/users/login",
    GET: "/users/me",
    LOGOUT: "/users/logout",
    UPDATE_USER: "/users/updateUser",
    UPDATE_PASSWORD: "/users/updatePassword",
    GET_ALL: "/users/getAllUsers",
  },
  EVENTS: {
    CREATE: "/events",
    GET_ALL: "/events",
    DETAILS: "/events",
    GET_HOST_EVENTS: "/events/host",
    UPDATE: "/events",
    DELETE: "/events",
  },
  ORDER: {
    ORDER: "/payment/createPaymentLink",
    GET_ALL: "/order/getAllOrders",
    GET_USER: "/order/getUserOrders",
  },
  REVIEWS: {
    ADD: "/reviews",
    GET_HOST_REVIEWS: "/reviews/host",
  },
  IMAGE: {
    UPLOAD: "/images/upload",
    DELETE: "/images/delete",
  },
};
