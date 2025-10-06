# FounderOS Website 🌐

The landing page and marketing site for FounderOS - The final CLI for builders.

## Quick Start

```bash
# From the project root
npm install

# Copy environment template
cp website/env.template website/.env.local

# Add your Clerk & Stripe keys to .env.local

# Start dev server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Features

- **Dark Theme** - Sleek zinc color palette with red-orange accents
- **Interactive Terminal** - Animated terminal hero section
- **Stripe Integration** - Payment processing for subscriptions
- **Clerk Waitlist** - Dark-themed waitlist signup
- **IBM Plex Mono** - Monospace font throughout
- **Responsive Design** - Mobile-first approach

## Tech Stack

- Next.js 15 (App Router)
- TypeScript 5.9
- Tailwind CSS 4
- Clerk Authentication
- Stripe Payments
- Lucide Icons

## Documentation

📚 **For detailed setup instructions, see [SETUP.md](./SETUP.md)**

Includes:

- Prerequisites and installation
- Environment variable configuration
- Stripe product setup
- Deployment guide
- Troubleshooting

## Project Structure

```
website/
├── app/                 # Next.js App Router
├── components/          # React components
├── config/             # Site configuration
├── lib/                # Utilities (Stripe, etc.)
└── SETUP.md            # Detailed setup guide
```

## Development Commands

From the **project root**:

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Need Help?

- See [SETUP.md](./SETUP.md) for complete setup instructions
- See [../README.md](../README.md) for project overview
- Check the Next.js, Clerk, and Stripe documentation

---

Built for builders 🚀
