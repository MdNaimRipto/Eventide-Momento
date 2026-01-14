import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import config from "../../../config/config";
import { IPaymentBody } from "./payment.interface";
import { IOrder } from "../order/order.interface";
import Stripe from "stripe";
import prisma from "../../../config/prisma";

const stripe = new Stripe(config.stripe_secret_key as string, {
  apiVersion: "2025-10-29.clover",
});

const createPaymentLink = async (payload: IPaymentBody) => {
  const { paidAmount, currency, email, userId, eventId, hostId } = payload;

  if (userId === hostId) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "You cannot book your own hosted event"
    );
  }

  // Prevent duplicate booking: same user cannot book same event twice
  const alreadyBooked = await prisma.order.findFirst({
    where: { userId: userId, eventId: eventId },
  });
  if (alreadyBooked) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "You have already booked this event with this account"
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email as string | undefined,
      line_items: [
        {
          price_data: {
            currency: (currency || "usd") as string,
            product_data: {
              name: `Event Payment - ${eventId}`,
              description: `Payment for event ${eventId}`,
            },
            unit_amount: Math.round(Number(paidAmount) * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${config.FRONTEND_URL}/user/profile?tab=upcoming-events`,
      cancel_url: `${config.FRONTEND_URL}/events`,
      metadata: {
        userId: String(userId),
        hostId: String(hostId),
        eventId: String(eventId),
        paidAmount: String(paidAmount),
        email: String(email || ""),
      },
    } as Stripe.Checkout.SessionCreateParams);

    return session.url;
  } catch (error) {
    console.error(error);
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Failed to generate Payment URL"
    );
  }
};

export const handleStripeWebhook = async (req: any, res: any) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      // --- Extract Metadata and payment info ---
      const metadata = session.metadata!;
      const paymentIntentId = session.payment_intent as string;
      const amountTotal = session.amount_total! / 100; // back to base unit

      const result = await prisma.order.create({
        data: {
          userId: metadata.userId,
          hostId: metadata.hostId,
          eventId: metadata.eventId,
          paidAmount: Number(metadata.paidAmount) || amountTotal,
          transectionId: paymentIntentId,
          paymentDate: new Date().toISOString(),
        },
      });

      // After order created, increment event's totalParticipants and update status if needed
      try {
        const eventId = metadata.eventId;
        const event = await prisma.event.findFirst({
          where: {
            id: eventId,
          },
        });
        if (event) {
          await prisma.event.update({
            where: { id: eventId },
            data: {
              totalParticipants: {
                increment: 1,
              },
            },
          });
        }
      } catch (err) {
        // Log but don't block order creation
        console.error("Error updating event participants/status:", err);
      }

      console.log("Order Result: ", result);
      console.log(
        `✅ Order placed successfully for transaction: ${paymentIntentId}`
      );
    } catch (err) {
      console.error("Error creating order:", err);
    }
  }

  res.status(200).send("Webhook received");
};

export const PaymentService = {
  createPaymentLink,
  handleStripeWebhook,
};
