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
          "Create projects with all languages and frameworks",
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
          "Generated versioned SDKs for type-safe service communication",
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
        "Skip the setup and start building. Create app components visually, and export to production-ready code.",
      cta: "Join Waitlist",
      secondaryCta: "See Plans",
      badge: "Powered by Open Source",
      socialProof: {
        productsValidated: "300+",
        productsValidatedLabel: "Tech stack combinations",
        successRate: "95%",
        successRateLabel: "Improved time to first deploy",
      },
    },
    benefits: {
      title: "Next Generation Bootstrapping",
      subtitle:
        "FounderOS allows you to configure the your apps core services, and then generates needed integrations, modules, and configuration.",
      items: [
        {
          title: "Lightning Fast",
          description:
            "Spin up a complete, type-safe stack in seconds. No config, no setup — just design and export.",
          icon: "Zap",
        },
        {
          title: "Payment Ready",
          description:
            "Built-in Stripe modules with recurring billing and webhook handling already wired up.",
          icon: "PiggyBank",
        },
        {
          title: "AI Ready",
          description:
            "Pre-typed APIs and clean data flows make adding LLMs or agents effortless.",
          icon: "Brain",
        },
        {
          title: "Build Your Way",
          description:
            "Pick from ready modules for analytics, auth, queues, and caches — all pre-configured.",
          icon: "Wrench",
        },
        {
          title: "Mobile First",
          description:
            "Generate responsive, accessible React or Next.js frontends instantly.",
          icon: "Smartphone",
        },
        {
          title: "No Hidden Magic",
          description:
            "Clean, typed, and editable TypeScript. Everything visible, nothing hidden.",
          icon: "Sparkles",
        },
        {
          title: "Prebuilt Authentication",
          description:
            "Secure your stack instantly with Clerk or Auth.js integration out of the box.",
          icon: "Shield",
        },
        {
          title: "Built for Growth",
          description:
            "Add new services or modules anytime. FounderOS keeps everything in sync.",
          icon: "TrendingUp",
        },
      ],
    },
    howItWorks: {
      title: "How It Works",
      subtitle: "Choose your stack, and start building.",
      steps: [
        {
          title: "Plan Your Architecture",
          description:
            "Visually lay out your system — add APIs, databases, caches, workers, and integrations. FounderOS creates clean YAML specs for every module and connection.",
          icon: "Binoculars",
        },
        {
          title: "Sync and Build",
          description:
            "Click Sync to generate Fastify routes, Zod schemas, typed SDKs, queues, and Next.js wiring — all in TypeScript and fully editable.",
          icon: "BarChart",
        },
        {
          title: "Evolve Gracefully",
          description:
            "FounderOS keeps your specs and code in sync. Change an endpoint, and your SDKs, tests, and mocks update automatically — no rewrites needed.",
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
          question: "How does this work?",
          answer:
            "FounderOS is a CLI that allows you to bootstrap your project in seconds. It's a tool that helps you to build your project faster and easier.",
        },
        {
          question: "How does FounderOS work?",
          answer:
            "When you create a new project, you'll be guided through a series of prompts to select your stack and features. Once you've selected your stack and features, the CLI will generate a project for you by combining a number of templates and integrations.",
        },
        {
          question: "Can I customize the project?",
          answer:
            "Yes! The project is fully customizable. You can modify the code to your liking.",
        },
        {
          question:
            "Can I create projects using the template in the FounderOS repository?",
          answer:
            "Yes! You can create projects using the template in the FounderOS repository. This is an entirely open source project.",
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
