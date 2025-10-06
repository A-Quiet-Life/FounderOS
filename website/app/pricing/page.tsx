"use client";

import Navbar from "@/components/Navbar";
import PricingCards from "@/components/PricingCards";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Choose the plan that's right for you. All plans include a 14-day
            free trial.
          </p>
        </div>

        {/* Pricing Cards with Checkout */}
        <PricingCards showCheckout={true} />

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-zinc-100 text-center mb-12">
            Pricing FAQs
          </h2>
          <div className="bg-zinc-900 rounded-2xl shadow-lg p-8 space-y-6 border border-zinc-800">
            <div>
              <h3 className="font-semibold text-zinc-100 mb-2">
                Can I change plans later?
              </h3>
              <p className="text-zinc-400">
                Yes! You can upgrade or downgrade your plan at any time. Changes
                will be reflected in your next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-100 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-zinc-400">
                We accept all major credit cards, debit cards, Apple Pay, and
                Google Pay through Stripe.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-100 mb-2">
                Is there a free trial?
              </h3>
              <p className="text-zinc-400">
                Yes! All plans come with a 14-day free trial. No credit card
                required to start.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-100 mb-2">
                Can I cancel anytime?
              </h3>
              <p className="text-zinc-400">
                Absolutely. You can cancel your subscription at any time with no
                penalties or fees.
              </p>
            </div>
          </div>
        </div>

        {/* Enterprise CTA */}
        <div className="mt-20 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-12 text-center text-white border border-orange-500">
          <h2 className="text-3xl font-bold mb-4">Need a custom plan?</h2>
          <p className="text-xl text-orange-100 mb-6 max-w-2xl mx-auto">
            Contact our sales team for enterprise pricing and custom features
            tailored to your needs.
          </p>
          <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-zinc-100 transition-colors">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
}
