import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

const PRO_PLAN_PRICE_ID = process.env.PRO_PLAN_PRICE_ID;
const STARTER_PLAN_PRICE_ID = process.env.STARTER_PLAN_PRICE_ID;

export async function POST(request: NextRequest) {
  try {
    const { priceId } = await request.json();

    const stripePriceId =
      priceId === "1"
        ? STARTER_PLAN_PRICE_ID
        : priceId === "2"
        ? PRO_PLAN_PRICE_ID
        : null;

    if (!stripePriceId) {
      return NextResponse.json({ error: "Invalid price ID" }, { status: 400 });
    }

    if (!priceId) {
      return NextResponse.json(
        { error: "Price ID is required" },
        { status: 400 }
      );
    }

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: stripePriceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/pricing`,
      // Optional: Add customer email if you have user authentication
      // customer_email: user.email,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
