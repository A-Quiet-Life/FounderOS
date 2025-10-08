"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import AnimatedDemo from "@/components/AnimatedDemo";
import PricingCards from "@/components/PricingCards";
import BenefitCard from "@/components/BenefitCard";
import HowItWorksCard from "@/components/HowItWorksCard";
import { siteConfig } from "@/config/site";
import {
  ChevronDown,
  ChevronUp,
  Zap,
  Shield,
  Target,
  Users,
  TrendingUp,
  Heart,
  Sparkles,
  CheckCircle,
  Rocket,
  ClipboardList,
  Send,
  BarChart,
  PiggyBank,
  Wrench,
  Brain,
  Smartphone,
  Binoculars,
  Cable,
} from "lucide-react";
import { Waitlist } from "@clerk/nextjs";

// Icon mapping function
const getIcon = (iconName: string, size: number = 32) => {
  const iconMap: Record<string, React.ComponentType<{ size: number }>> = {
    Zap,
    Shield,
    BarChart,
    Users,
    Target,
    Sparkles,
    TrendingUp,
    Heart,
    PiggyBank,
    Wrench,
    Brain,
    Smartphone,
    ClipboardList,
    Rocket,
    Binoculars,
  };

  const IconComponent = iconMap[iconName];
  return IconComponent ? <IconComponent size={size} /> : null;
};

export default function LandingPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />

      {/* Hero Section - Split Layout */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-zinc-800 via-zinc-950 to-black relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Hero Text */}
            <div className="space-y-6 animate-slide-in-left">
              <div className="inline-flex items-center space-x-2 px-4 py-2 glass-effect rounded-full text-orange-400 text-sm font-medium shadow-lg border border-zinc-800">
                <Cable size={16} />
                <span>{siteConfig.landing.hero.badge}</span>
              </div>

              <h1 className="text-5xl sm:text-4xl lg:text-6xl font-bold text-zinc-100 leading-tight tracking-tight break-words">
                The
                <span
                  className="text-6xl sm:text-5xl md:text-7xl bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"
                  style={{ fontFamily: siteConfig.fonts.cursive }}
                >
                  {" "}
                  visual{" "}
                </span>
                IDE for builders
              </h1>

              <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed">
                {siteConfig.landing.hero.subtitle}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#pricing"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-lg hover:from-red-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  See Plans
                  <Rocket className="ml-2" size={20} />
                </Link>
                <a
                  href="#waitlist"
                  className="inline-flex items-center justify-center px-8 py-4 bg-zinc-800 text-zinc-100 font-semibold rounded-lg border-2 border-zinc-700 hover:border-orange-500 hover:bg-zinc-700 transition-all"
                >
                  Join Waitlist
                  <Send className="ml-2" size={20} />
                </a>
              </div>

              {/* Social Proof */}
              <div className="flex items-center space-x-6 sm:space-x-8 pt-4">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-zinc-100">
                    {siteConfig.landing.hero.socialProof.productsValidated}
                  </div>
                  <div className="text-xs sm:text-sm text-zinc-500">
                    {siteConfig.landing.hero.socialProof.productsValidatedLabel}
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-zinc-100">
                    {siteConfig.landing.hero.socialProof.successRate}
                  </div>
                  <div className="text-xs sm:text-sm text-zinc-500">
                    {siteConfig.landing.hero.socialProof.successRateLabel}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Animated Demo */}
            <AnimatedDemo />
          </div>
        </div>
      </section>

      {/* Benefits Section - Bento Grid */}
      <section className="py-28 bg-gradient-to-b from-zinc-950 to-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-4">
              {siteConfig.landing.benefits.title}
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-6">
              {siteConfig.landing.benefits.subtitle}
            </p>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-lg hover:from-red-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              Try Interactive Demo
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Bento Grid: 3 rows with different layouts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-scale-in delay-200">
            {/* Row 1 */}
            <BenefitCard
              title={siteConfig.landing.benefits.items[0].title}
              description={siteConfig.landing.benefits.items[0].description}
              icon={getIcon(siteConfig.landing.benefits.items[0].icon)}
              className="md:col-span-1"
            />
            <BenefitCard
              title={siteConfig.landing.benefits.items[1].title}
              description={siteConfig.landing.benefits.items[1].description}
              icon={getIcon(siteConfig.landing.benefits.items[1].icon)}
              className="md:col-span-1"
            />
            <BenefitCard
              title={siteConfig.landing.benefits.items[2].title}
              description={siteConfig.landing.benefits.items[2].description}
              icon={getIcon(siteConfig.landing.benefits.items[2].icon)}
              className="md:col-span-1"
            />

            {/* Row 2 - Different sizes */}
            <BenefitCard
              title={siteConfig.landing.benefits.items[3].title}
              description={siteConfig.landing.benefits.items[3].description}
              icon={getIcon(siteConfig.landing.benefits.items[3].icon)}
              className="lg:col-span-2 md:row-span-1"
            />
            <BenefitCard
              title={siteConfig.landing.benefits.items[4].title}
              description={siteConfig.landing.benefits.items[4].description}
              icon={getIcon(siteConfig.landing.benefits.items[4].icon)}
              className="lg:col-span-1"
            />

            {/* Row 3 */}
            <BenefitCard
              title={siteConfig.landing.benefits.items[5].title}
              description={siteConfig.landing.benefits.items[5].description}
              icon={getIcon(siteConfig.landing.benefits.items[5].icon)}
              className="md:col-span-1"
            />
            <BenefitCard
              title={siteConfig.landing.benefits.items[6].title}
              description={siteConfig.landing.benefits.items[6].description}
              icon={getIcon(siteConfig.landing.benefits.items[6].icon)}
              className="md:col-span-1"
            />
            <BenefitCard
              title={siteConfig.landing.benefits.items[7].title}
              description={siteConfig.landing.benefits.items[7].description}
              icon={getIcon(siteConfig.landing.benefits.items[7].icon)}
              className="md:col-span-1"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-28 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-4">
              {siteConfig.landing.howItWorks.title}
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              {siteConfig.landing.howItWorks.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Animated Demo */}
            <div className="animate-slide-in-left">
              <AnimatedDemo type="api-config" />
            </div>

            {/* Right: Steps */}
            <div className="space-y-6 animate-slide-in-right">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getIcon(siteConfig.landing.howItWorks.steps[0].icon, 28)}
                    <h3 className="text-xl font-semibold text-zinc-100">
                      {siteConfig.landing.howItWorks.steps[0].title}
                    </h3>
                  </div>
                  <p className="text-zinc-400 leading-relaxed">
                    {siteConfig.landing.howItWorks.steps[0].description}
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getIcon(siteConfig.landing.howItWorks.steps[1].icon, 28)}
                    <h3 className="text-xl font-semibold text-zinc-100">
                      {siteConfig.landing.howItWorks.steps[1].title}
                    </h3>
                  </div>
                  <p className="text-zinc-400 leading-relaxed">
                    {siteConfig.landing.howItWorks.steps[1].description}
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getIcon(siteConfig.landing.howItWorks.steps[2].icon, 28)}
                    <h3 className="text-xl font-semibold text-zinc-100">
                      {siteConfig.landing.howItWorks.steps[2].title}
                    </h3>
                  </div>
                  <p className="text-zinc-400 leading-relaxed">
                    {siteConfig.landing.howItWorks.steps[2].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-28 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-4">
              {siteConfig.landing.pricing.title}
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              {siteConfig.landing.pricing.subtitle}
            </p>
          </div>

          <div className="animate-scale-in delay-200 flex justify-center">
            <PricingCards showCheckout={false} />
          </div>

          <div className="text-center mt-12">
            <Link
              href="/pricing"
              className="inline-flex items-center text-orange-500 font-semibold hover:text-orange-400 text-lg"
            >
              {siteConfig.landing.pricing.viewDetailsText}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-28 bg-gradient-to-b from-zinc-900 to-zinc-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-4">
              {siteConfig.landing.faq.title}
            </h2>
            <p className="text-xl text-zinc-400">
              {siteConfig.landing.faq.subtitle}
            </p>
          </div>
          <div className="space-y-4 animate-fade-in delay-200">
            {siteConfig.landing.faq.items.map((faq, index) => (
              <div
                key={index}
                className="bg-zinc-900 border-2 border-zinc-800 rounded-xl overflow-hidden hover:border-orange-500 transition-colors"
              >
                <button
                  onClick={() =>
                    setOpenFaqIndex(openFaqIndex === index ? null : index)
                  }
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-zinc-800 transition-colors"
                >
                  <span className="font-semibold text-zinc-100">
                    {faq.question}
                  </span>
                  {openFaqIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-zinc-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-zinc-400 flex-shrink-0" />
                  )}
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 py-4 bg-zinc-800 border-t border-zinc-700">
                    <p className="text-zinc-300">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section
        id="waitlist"
        className="py-20 bg-gradient-to-br from-zinc-950 via-black to-zinc-950 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Clerk Waitlist Component */}
          <div className="max-w-4xl mx-auto">
            <Waitlist
              appearance={{
                elements: {
                  rootBox: {
                    width: "100%",
                    minHeight: "500px",
                  },
                  cardBox: {
                    width: "100%",
                    padding: "none",
                  },
                  card: {
                    backgroundColor: "#18181b",
                    padding: "3rem 2.5rem",
                    borderRadius: "1.5rem",
                  },
                  form: {
                    gap: "0.5rem",
                  },
                  formButtonPrimary: {
                    background: "linear-gradient(to right, #dc2626, #ea580c)",
                    fontSize: "1rem",
                    fontWeight: "600",
                    padding: "1rem 1.5rem",
                    minHeight: "3.5rem",
                    marginTop: "1.5rem",
                    borderRadius: "0.75rem",
                    boxShadow:
                      "0 4px 6px -1px rgba(220, 38, 38, 0.4), 0 2px 4px -1px rgba(234, 88, 12, 0.3)",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      background: "linear-gradient(to right, #b91c1c, #c2410c)",
                      transform: "translateY(-1px)",
                      boxShadow:
                        "0 6px 10px -1px rgba(185, 28, 28, 0.5), 0 4px 6px -1px rgba(194, 65, 12, 0.4)",
                    },
                    "&:active": {
                      transform: "translateY(0)",
                    },
                  },
                  formFieldInput: {
                    fontSize: "1rem",
                    padding: "1rem 1.25rem",
                    minHeight: "3.5rem",
                    borderRadius: "0.75rem",
                    border: "2px solid #3f3f46",
                    backgroundColor: "#09090b",
                    color: "#fafafa",
                    transition: "all 0.2s ease",
                    "&::placeholder": {
                      color: "#fafafa",
                      opacity: 0.7,
                    },
                    "&:hover": {
                      borderColor: "#52525b",
                      backgroundColor: "#18181b",
                    },
                    "&:focus": {
                      borderColor: "#f97316",
                      backgroundColor: "#18181b",
                      boxShadow: "0 0 0 3px rgba(249, 115, 22, 0.2)",
                      outline: "none",
                    },
                  },
                  formFieldLabel: {
                    marginBottom: "0.5rem",
                    fontSize: "0.95rem",
                    fontWeight: "600",
                    color: "#fafafa",
                  },
                  headerTitle: {
                    fontSize: "2rem",
                    fontWeight: "700",
                    marginBottom: "0.75rem",
                    color: "#fafafa",
                    letterSpacing: "-0.025em",
                  },
                  headerSubtitle: {
                    fontSize: "1.0625rem",
                    marginBottom: "2rem",
                    lineHeight: "1.7",
                    color: "#a1a1aa",
                    fontWeight: "400",
                  },
                  footer: {
                    display: "none",
                    marginTop: "2rem",
                    paddingTop: "1.5rem",
                    borderTop: "1px solid #3f3f46",
                  },
                  formFieldInputShowPasswordButton: {
                    color: "#a1a1aa",
                    "&:hover": {
                      color: "#fafafa",
                    },
                  },
                  identityPreviewText: {
                    color: "#a1a1aa",
                  },
                  identityPreviewEditButton: {
                    color: "#f97316",
                    "&:hover": {
                      color: "#ea580c",
                    },
                  },
                  formFieldErrorText: {
                    color: "#ef4444",
                  },
                  formFieldSuccessText: {
                    color: "#22c55e",
                  },
                  otpCodeFieldInput: {
                    borderColor: "#3f3f46",
                    backgroundColor: "#09090b",
                    color: "#fafafa",
                    "&:hover": {
                      borderColor: "#52525b",
                    },
                    "&:focus": {
                      borderColor: "#f97316",
                      backgroundColor: "#18181b",
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-zinc-500 py-4 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left">
            <p className="text-sm">© 2025 {siteConfig.name}.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
