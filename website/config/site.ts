export const siteConfig = {
  name: "FounderOS",
  description:
    "The final CLI for builders. Bootstrap your next company in one command.",

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
          "Access to FounderOS",
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
          "One click setup for Stripe, Clerk and Posthog integration",
          "Create caches, queues, and event driven services",
          "Secure connections with generated SDKs",
          "AI Integration for project fine tuning",
          "Priority support",
        ],
        popular: true,
      },
      // {
      //   name: "Enterprise",
      //   price: "$99",
      //   priceId: "price_enterprise_monthly", // Replace with your Stripe Price ID
      //   description: "For startups and larger teams",
      //   features: [
      //     "Everything in Pro",
      //     "Scale ready templates",
      //     "Dedicated support",
      //     "Custom integrations",
      //   ],
      // },
    ],
  },

  // Landing Page Content
  landing: {
    hero: {
      subtitle:
        "Bootstrap your next project in seconds. Combine any tech stack, be it backend, frontend, or mobile.",
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
      title: "The CLI you've been waiting for",
      subtitle:
        "FounderOS allows you to bypass all the pain bootstrapping from scratch.",
      items: [
        {
          title: "Lightning Fast",
          description: "Each project is bootstrapped in seconds, not hours.",
          icon: "Zap",
        },
        {
          title: "Payment Ready",
          description:
            "Stripe integration out of the box. Prebuilt rails for recurring revenue.",
          icon: "PiggyBank",
        },
        {
          title: "AI Ready",
          description:
            "All projects come with build-in cursorrules for day-1 agentic coding.",
          icon: "Brain",
        },
        {
          title: "Build your way",
          description:
            "Choose from multiple backend languages, frameworks, and features. Everything comes pre-configured and ready to run.",
          icon: "Wrench",
        },
        {
          title: "Mobile First",
          description: "Build mobile first, and ",
          icon: "Smartphone",
        },
        {
          title: "No Hidden Magic",
          description:
            "All code is ready for you to understand and modify. Nothing is hidden.",
          icon: "Sparkles",
        },
        {
          title: "Prebuilt Authentication",
          description:
            "All projects come with prebuilt authentication using industry standards.",
          icon: "Shield",
        },
        {
          title: "Built for Modern Growth",
          description: "Frontends ship with implemented SEO and analytics.",
          icon: "TrendingUp",
        },
      ],
    },
    howItWorks: {
      title: "How It Works",
      subtitle: "Choose your stack, and start building.",
      steps: [
        {
          title: "Choose your stack",
          description:
            "View our free extensive list of tech stacks, and choose the one that best fits your project.",
          icon: "Binoculars",
        },
        {
          title: "Run <founder found>",
          description:
            "Run our CLI to bootstrap your project. The CLI will guide you through the process, making stack selection a breeze.",
          icon: "BarChart",
        },
        {
          title: "Launch & Share",
          description:
            "Deploy to Vercel or any host in minutes. Share your validation page with potential users.",
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
