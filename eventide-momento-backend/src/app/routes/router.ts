import express from "express";
import { UserRouter } from "../modules/user/user.router";
import { EventRouter } from "../modules/events/events.router";
import { ImageRouter } from "../modules/images/images.router";
import { OrderRouter } from "../modules/order/order.router";
import { PaymentRouter } from "../modules/payment/payment.router";
import { ReviewRouter } from "../modules/reviews/reviews.router";

const router = express.Router();

const routes = [
  {
    path: "/users",
    route: UserRouter,
  },
  {
    path: "/events",
    route: EventRouter,
  },
  {
    path: "/images",
    route: ImageRouter,
  },
  {
    path: "/orders",
    route: OrderRouter,
  },
  {
    path: "/payment",
    route: PaymentRouter,
  },
  {
    path: "/reviews",
    route: ReviewRouter,
  },
];

routes.map((r) => router.use(r.path, r.route));

export const Routers = router;
