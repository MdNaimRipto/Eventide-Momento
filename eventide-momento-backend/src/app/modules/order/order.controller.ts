import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { OrderService } from "./order.service";
import pick from "../../../shared/shared";
import { OrderFilterableFields } from "./order.constant";
import { paginationFields } from "../../../constants/pagination.constant";
import { jwtHelpers } from "../../../helpers/jwtHelpers";

// All Orders
const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, OrderFilterableFields);
  const options = pick(req.query, paginationFields);
  const token = jwtHelpers.verifyAuthToken(req);

  const result = await OrderService.getAllOrders(filters, options, token);

  sendResponse(res, {
    message: "Order's Retrieved",
    data: result,
  });
});

// User Orders
const getUserOrders = catchAsync(async (req: Request, res: Response) => {
  const token = jwtHelpers.verifyAuthToken(req);
  const result = await OrderService.getUserOrders(token);

  sendResponse(res, {
    message: "Order's Retrieved",
    data: result,
  });
});

// Update Order (paidAmount / transectionId / eventId / userId)
const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const { ...payload } = req.body;

  const result = await OrderService.updateOrder(id, payload as any);

  sendResponse(res, {
    message: "Order updated successfully",
    data: result,
  });
});

// * Orders overview (host-specific)
const getOrdersOverview = catchAsync(async (req: Request, res: Response) => {
  const token = jwtHelpers.verifyAuthToken(req);

  const result = await OrderService.getOrdersOverview(token);

  sendResponse(res, {
    message: "Order Overview Retrieved",
    data: result,
  });
});

export const OrderController = {
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  getOrdersOverview,
};
