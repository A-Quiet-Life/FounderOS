export const siteConfig = {
  name: "FounderOS",
  description:
    "FounderOS is the visual IDE for builders. Implement your idea in seconds, without configuration headaches.",

  // Fonts
  fonts: {
    cursive: "var(--font-kalam)",
  },

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
        price: "$19",
        priceId: "price_starter_monthly", // Replace with your Stripe Price ID
        description: "Perfect for prototyping",
        features: [
          "Access to the FounderOS CLI and Web Builder",
          "Secures services with basic authentication",
          "Define API routes and endpoints",
          "Email support",
        ],
      },
      {
        name: "Pro",
        price: "$29",
        priceId: "price_pro_monthly", // Replace with your Stripe Price ID
        description: "For building production ready systems",
        features: [
          "Everything in Starter",
          "One click setup for payment, authentication, and analytics integration",
          "Create caches, queues, and event driven services",
          "Generated versioned SDKs for type-safe service communication using tRPC",
          "AI Integration for project fine tuning",
          "Priority support",
        ],
        popular: true,
      },
      {
        name: "Enterprise",
        price: "$99",
        priceId: "price_enterprise_monthly", // Replace with your Stripe Price ID
        description: "For startups and larger teams",
        features: [
          "Everything in Pro",
          "Unlimited seats per project",
          "Dedicated support",
          "Custom integrations",
        ],
      },
    ],
  },

  // Landing Page Content
  landing: {
    hero: {
      subtitle:
        "Build full-stack TypeScript apps in minutes. Design your system visually, then export a production-ready monorepo powered by your favorite technologies.",
      cta: "Join Waitlist",
      secondaryCta: "See Plans",
      badge: "Powered by Open Source",
      socialProof: {
        productsValidated: "10x",
        productsValidatedLabel: "Faster to first deploy",
        successRate: "500+",
        successRateLabel: "Developers waitlisted",
      },
    },
    benefits: {
      title: "Next-Generation TypeScript Bootstrapping",
      subtitle:
        "FounderOS builds complete full-stack TypeScript monorepos using tools like tRPC, Prisma, Bun, and Next.js — so you can skip setup and start shipping.",
      items: [
        {
          title: "Lightning Fast",
          description:
            "Spin up a full-stack TypeScript app in seconds. tRPC, Prisma, and Next.js all configured automatically.",
          icon: "Zap",
        },
        {
          title: "Payment Ready",
          description:
            "Drop-in Stripe modules with typed endpoints, recurring billing, and webhook validation ready to go.",
          icon: "PiggyBank",
        },
        {
          title: "AI Ready",
          description:
            "Strongly typed APIs and clean data models make connecting LLMs or AI agents straightforward.",
          icon: "Brain",
        },
        {
          title: "Build Your Way",
          description:
            "Add analytics, auth, queues, or caches with prebuilt TypeScript modules that integrate seamlessly.",
          icon: "Wrench",
        },
        {
          title: "Mobile First",
          description:
            "Generate responsive React and Next.js frontends with modern, accessible components.",
          icon: "Smartphone",
        },
        {
          title: "No Hidden Magic",
          description:
            "All generated code is plain TypeScript — readable, typed, and easy to extend. No hidden layers.",
          icon: "Sparkles",
        },
        {
          title: "Prebuilt Authentication",
          description:
            "Secure your stack instantly with Clerk or Auth.js. Typed guards and client hooks included by default.",
          icon: "Shield",
        },
        {
          title: "Built for Growth",
          description:
            "Easily expand your monorepo with new tRPC services or background workers. FounderOS keeps everything in sync.",
          icon: "TrendingUp",
        },
      ],
    },
    howItWorks: {
      title: "How It Works",
      subtitle: "Build full-stack TypeScript apps without the setup.",
      steps: [
        {
          title: "Plan Your Architecture",
          description:
            "Visually map your apps services — APIs, databases, queues, and integrations. FounderOS turns your layout into clean TypeScript specs.",
          icon: "Binoculars",
        },
        {
          title: "Sync and Build",
          description:
            "Click Sync to scaffold routes, Zod schemas, typed SDKs with tRPC, and frontends — all TypeScript, all editable in your monorepo.",
          icon: "BarChart",
        },
        {
          title: "Evolve Gracefully",
          description:
            "As your app grows, FounderOS keeps contracts, SDKs, and tests in sync automatically. Add new services or features without breaking your stack.",
          icon: "Rocket",
        },
      ],
    },

    pricing: {
      title: "Simple, Transparent Pricing",
      subtitle: "Choose the plan that's right for you. Start building today.",
      viewDetailsText: "View full pricing details →",
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know",
      items: [
        {
          question: "What is FounderOS?",
          answer:
            "FounderOS is a visual builder and CLI for creating full-stack TypeScript monorepos. It scaffolds APIs, frontends, databases, and integrations in seconds.",
        },
        {
          question: "What stacks are supported?",
          answer:
            "FounderOS is built around modern TypeScript frameworks: Next.js, tRPC, Prisma, React, and Node.js. More options will be added as the platform grows.",
        },
        {
          question: "Can I use it with my existing codebase?",
          answer:
            "Yes. You can import your current repo, generate specs for existing APIs, and add new services or modules on top without rewriting anything.",
        },
        {
          question: "Can I customize the generated code?",
          answer:
            "Absolutely. All code is plain, editable TypeScript — you can modify, extend, or replace anything at any time.",
        },
        {
          question: "Does FounderOS handle deployment?",
          answer:
            "Not yet. We are choosing to focus on code generation right now. You can deploy your project anywhere — be it a provider or or your own infrastructure.",
        },
        {
          question: "Is it open source?",
          answer:
            "Yes. FounderOS will launch with open-source templates and a CLI. Paid plans may add hosted syncing and advanced modules later on.",
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
