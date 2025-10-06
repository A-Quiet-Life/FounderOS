export const siteConfig = {
  name: "FounderOS",
  description:
    "The final CLI for builders. Bootstrap your next company in one command.",

  // Navigation
  nav: {
    landing: "/",
    pricing: "/pricing",
  },

  // Pricing Plans (configure with your Stripe Price IDs)
  pricing: {
    plans: [
      {
        name: "Starter",
        price: "$9",
        priceId: "price_starter_monthly", // Replace with your Stripe Price ID
        description: "Perfect for trying out",
        features: ["Feature 1", "Feature 2", "Feature 3", "Email support"],
      },
      {
        name: "Pro",
        price: "$29",
        priceId: "price_pro_monthly", // Replace with your Stripe Price ID
        description: "For serious users",
        features: [
          "Everything in Starter",
          "Advanced Feature 1",
          "Advanced Feature 2",
          "Advanced Feature 3",
          "Priority support",
        ],
        popular: true,
      },
      {
        name: "Enterprise",
        price: "$99",
        priceId: "price_enterprise_monthly", // Replace with your Stripe Price ID
        description: "For large teams",
        features: [
          "Everything in Pro",
          "Enterprise Feature 1",
          "Enterprise Feature 2",
          "Dedicated support",
          "Custom integration",
        ],
      },
    ],
  },

  // Landing Page Content
  landing: {
    hero: {
      subtitle:
        "Build, test, and validate your product with real users before investing months of development.",
      cta: "Join Waitlist",
      secondaryCta: "See Plans",
      badge: "Launching Soon",
      socialProof: {
        productsValidated: "300+",
        productsValidatedLabel: "Tech stack combinations",
        successRate: "95%",
        successRateLabel: "Improved time to first deploy",
      },
    },
    features: [
      {
        title: "Fast Setup",
        description: "Get your validation page live in minutes, not days.",
        icon: "⚡",
      },
      {
        title: "Payment Ready",
        description:
          "Integrated Stripe checkout to validate willingness to pay.",
        icon: "💳",
      },
      {
        title: "Waitlist Built-in",
        description:
          "Capture interest with a beautiful waitlist powered by Clerk.",
        icon: "📝",
      },
      {
        title: "Mobile Optimized",
        description: "Looks great on all devices with responsive design.",
        icon: "📱",
      },
    ],
    benefits: {
      title: "Everything You Need",
      subtitle: "Built-in tools and features to validate your product idea",
      items: [
        {
          title: "Lightning Fast",
          description:
            "Deploy in minutes, not days. Get your validation page live instantly.",
        },
        {
          title: "Payment Ready",
          description:
            "Stripe integration out of the box. Test willingness to pay.",
        },
        {
          title: "Built-in Analytics",
          description: "Track every interaction and conversion automatically.",
        },
        {
          title: "Waitlist Management",
          description:
            "Capture early interest with Clerk's powerful waitlist component. Build your launch list.",
        },
        {
          title: "Mobile Optimized",
          description: "Perfect on any device with responsive design.",
        },
        {
          title: "Easy Customization",
          description:
            "Single config file controls all content. No hunting through code.",
        },
        {
          title: "Growth Focused",
          description: "Optimize for conversions with built-in best practices.",
        },
        {
          title: "Support Included",
          description: "Documentation and examples to get you started fast.",
        },
      ],
    },
    howItWorks: {
      title: "How It Works",
      subtitle: "Three simple steps to validate your product idea",
      steps: [
        {
          title: "Customize Your Page",
          description:
            "Update the config file with your product details, pricing, and features. No complex setup required.",
        },
        {
          title: "Launch & Share",
          description:
            "Deploy to Vercel or any host in minutes. Share your validation page with potential users.",
        },
        {
          title: "Collect Data",
          description:
            "Track signups, measure interest, and test pricing. Make informed decisions before building.",
        },
      ],
    },
    pricing: {
      title: "Simple, Transparent Pricing",
      subtitle: "Choose the plan that's right for you. Start validating today.",
      viewDetailsText: "View full pricing details →",
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know",
      items: [
        {
          question: "How does this work?",
          answer:
            "Simply customize the template with your product idea, deploy it, and share with potential users to validate demand.",
        },
        {
          question: "Do I need coding experience?",
          answer:
            "Basic knowledge of React and Next.js is helpful, but the template is designed to be easy to customize.",
        },
        {
          question: "Can I customize the design?",
          answer:
            "Yes! The template uses Tailwind CSS, making it easy to adjust colors, spacing, and layout to match your brand.",
        },
        {
          question: "What payment methods are supported?",
          answer:
            "We integrate with Stripe, which supports all major credit cards, Apple Pay, Google Pay, and more.",
        },
      ],
    },
    comparison: {
      title: "Choose the Right Plan",
      features: [
        { name: "Feature A", starter: true, pro: true, enterprise: true },
        { name: "Feature B", starter: true, pro: true, enterprise: true },
        { name: "Feature C", starter: false, pro: true, enterprise: true },
        { name: "Feature D", starter: false, pro: true, enterprise: true },
        { name: "Feature E", starter: false, pro: false, enterprise: true },
        { name: "Feature F", starter: false, pro: false, enterprise: true },
      ],
    },
  },
};

export type SiteConfig = typeof siteConfig;
