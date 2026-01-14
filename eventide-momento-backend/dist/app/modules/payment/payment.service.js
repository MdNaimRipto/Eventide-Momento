"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = exports.handleStripeWebhook = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config/config"));
const stripe_1 = __importDefault(require("stripe"));
const prisma_1 = __importDefault(require("../../../config/prisma"));
const stripe = new stripe_1.default(config_1.default.stripe_secret_key, {
    apiVersion: "2025-10-29.clover",
});
const createPaymentLink = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { paidAmount, currency, email, userId, eventId, hostId } = payload;
    if (userId === hostId) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "You cannot book your own hosted event");
    }
    // Prevent duplicate booking: same user cannot book same event twice
    const alreadyBooked = yield prisma_1.default.order.findFirst({
        where: { userId: userId, eventId: eventId },
    });
    if (alreadyBooked) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, "You have already booked this event with this account");
    }
    try {
        const session = yield stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            customer_email: email,
            line_items: [
                {
                    price_data: {
                        currency: (currency || "usd"),
                        product_data: {
                            name: `Event Payment - ${eventId}`,
                            description: `Payment for event ${eventId}`,
                        },
                        unit_amount: Math.round(Number(paidAmount) * 100),
                    },
                    quantity: 1,
                },
            ],
            success_url: `${config_1.default.FRONTEND_URL}/user/profile?tab=upcoming-events`,
            cancel_url: `${config_1.default.FRONTEND_URL}/events`,
            metadata: {
                userId: String(userId),
                hostId: String(hostId),
                eventId: String(eventId),
                paidAmount: String(paidAmount),
                email: String(email || ""),
            },
        });
        return session.url;
    }
    catch (error) {
        console.error(error);
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to generate Payment URL");
    }
});
const handleStripeWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    }
    catch (err) {
        console.error("Webhook signature verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        try {
            // --- Extract Metadata and payment info ---
            const metadata = session.metadata;
            const paymentIntentId = session.payment_intent;
            const amountTotal = session.amount_total / 100; // back to base unit
            const result = yield prisma_1.default.order.create({
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
                const event = yield prisma_1.default.event.findFirst({
                    where: {
                        id: eventId,
                    },
                });
                if (event) {
                    yield prisma_1.default.event.update({
                        where: { id: eventId },
                        data: {
                            totalParticipants: {
                                increment: 1,
                            },
                        },
                    });
                }
            }
            catch (err) {
                // Log but don't block order creation
                console.error("Error updating event participants/status:", err);
            }
            console.log("Order Result: ", result);
            console.log(`✅ Order placed successfully for transaction: ${paymentIntentId}`);
        }
        catch (err) {
            console.error("Error creating order:", err);
        }
    }
    res.status(200).send("Webhook received");
});
exports.handleStripeWebhook = handleStripeWebhook;
exports.PaymentService = {
    createPaymentLink,
    handleStripeWebhook: exports.handleStripeWebhook,
};
