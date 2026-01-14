import express from "express";
import { PaymentController } from "./payment.controller";

const router = express.Router();

router.post("/createPaymentLink", PaymentController.createPaymentLink);

export const PaymentRouter = router;
