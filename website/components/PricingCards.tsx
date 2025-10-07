"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Loader2 } from "lucide-react";
import { siteConfig } from "@/config/site";

interface PricingCardsProps {
  showCheckout?: boolean;
}

export default function PricingCards({
  showCheckout = false,
}: PricingCardsProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (priceId: string) => {
    setLoading(priceId);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
      });

      const { url, error } = await response.json();

      if (error) {
        console.error("Error creating checkout session:", error);
        return;
      }

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setLoading(null);
    }
  };

  const gridCols =
    siteConfig.pricing.plans.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3";

  return (
    <div className={`grid ${gridCols} gap-8 max-w-6xl mx-auto`}>
      {siteConfig.pricing.plans.map((plan, index) => (
        <div
          key={index}
          className={`relative bg-zinc-900 rounded-2xl shadow-xl overflow-hidden max-w-md ${
            plan.popular
              ? "border-4 border-orange-500"
              : "border-2 border-zinc-800"
          }`}
        >
          {plan.popular && (
            <div className="absolute top-0 right-0 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
              Most Popular
            </div>
          )}

          <div className="p-8">
            {/* Plan Header */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-zinc-100 mb-2">
                {plan.name}
              </h3>
              <p className="text-zinc-400 text-sm">{plan.description}</p>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-5xl font-bold text-zinc-100">
                  {plan.price}
                </span>
                <span className="text-zinc-400 ml-2">/once</span>
              </div>
            </div>

            {/* CTA Button */}
            {showCheckout ? (
              <button
                onClick={() => handleCheckout(plan.priceId)}
                disabled={loading !== null}
                className={`w-full py-3 rounded-lg font-semibold transition-all mb-6 flex items-center justify-center ${
                  plan.popular
                    ? "bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600"
                    : "bg-zinc-800 text-white hover:bg-zinc-700"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading === plan.priceId ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Processing...
                  </>
                ) : (
                  "Start Free Trial"
                )}
              </button>
            ) : (
              <Link
                href="/pricing"
                className={`w-full py-3 rounded-lg font-semibold transition-all mb-6 flex items-center justify-center ${
                  plan.popular
                    ? "bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600"
                    : "bg-zinc-800 text-white hover:bg-zinc-700"
                }`}
              >
                Get Started
              </Link>
            )}

            {/* Features List */}
            <div className="space-y-3">
              {plan.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
