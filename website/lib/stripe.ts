import Stripe from "stripe";

/**
 * Stripe SDK instance
 *
 * This module exports a configured Stripe instance using the latest SDK version.
 * It will throw an error at runtime if STRIPE_SECRET_KEY is not configured.
 *
 * Usage:
 * import { stripe } from "@/lib/stripe";
 * const session = await stripe.checkout.sessions.create({...});
 */

let stripeInstance: Stripe | null = null;

function getStripe(): Stripe {
  if (stripeInstance) {
    return stripeInstance;
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set in environment variables. " +
        "Please add it to your .env.local file for development or " +
        "environment variables for production."
    );
  }

  stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-09-30.clover",
    typescript: true,
  });

  return stripeInstance;
}

// Export a proxy object that lazily initializes Stripe
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    const instance = getStripe();
    const value = instance[prop as keyof Stripe];
    return typeof value === "function" ? value.bind(instance) : value;
  },
});
