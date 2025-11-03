import express from "express";
import { handleStripeWebhook } from "../controllers/paymentControllers";

const router = express.Router();

// Route for webhook listening for payment events

// Stripe webhook handler

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  handleStripeWebhook
);

export default router;
