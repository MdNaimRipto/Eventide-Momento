"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouter = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
router.get("/getAllOrders", order_controller_1.OrderController.getAllOrders);
router.get("/getUserOrders", order_controller_1.OrderController.getUserOrders);
router.patch("/updateOrderStatus/:id", order_controller_1.OrderController.updateOrderStatus);
router.get("/getOrdersOverview", order_controller_1.OrderController.getOrdersOverview);
exports.OrderRouter = router;
