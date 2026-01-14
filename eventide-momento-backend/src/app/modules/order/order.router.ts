import express from "express";
import { OrderController } from "./order.controller";

const router = express.Router();

router.get("/getAllOrders", OrderController.getAllOrders);

router.get("/getUserOrders", OrderController.getUserOrders);

router.patch("/updateOrderStatus/:id", OrderController.updateOrderStatus);

router.get("/getOrdersOverview", OrderController.getOrdersOverview);

export const OrderRouter = router;
