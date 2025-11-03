import express, { Request, Response } from "express";
import stripePackage from "stripe";
import * as admin from "firebase-admin";

const stripe = new stripePackage(process.env.STRIPE_SECRET_KEY as string);

// Route for webhook listening for payment events
// Stripe webhook handler
export const handleStripeWebhook = async (req: Request, res: Response) => {
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"] as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session: any = event.data.object;
      const userId = session.client_reference_id;

      // Update user status in Firebase Realtime Database
      const db = admin.database();
      const ref = db.ref(`users/${userId}`);
      await ref.update({ status: "premium" });

      console.log("User status updated to premium");
      break;
    }
    case "payment_intent.succeeded": {
      const paymentIntentSucceeded = event.data.object;
      console.log(paymentIntentSucceeded);
      console.log("Payment intent succeeded");
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    }
    case "payment_intent.created": {
      const paymentIntentCreated = event.data.object;
      console.log(paymentIntentCreated);
      // Define and call a function to handle the event payment_intent.created
      break;
    }
    case "checkout.session.async_payment_succeeded": {
      const asyncPaymentSession = event.data.object;
      console.log(asyncPaymentSession);
      // Define and call a function to handle the event checkout.session.async_payment_succeeded
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({ received: true });
  console.log("Stripe webhook received");
};

export default { handleStripeWebhook };
