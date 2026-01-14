import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { PaymentService } from "./payment.service";

// Make Payment
const createPaymentLink = catchAsync(async (req: Request, res: Response) => {
  const { ...payload } = req.body;

  const result = await PaymentService.createPaymentLink(payload);

  sendResponse(res, {
    message: "Payment SuccessFul",
    data: result,
  });
});

export const PaymentController = {
  createPaymentLink,
};
