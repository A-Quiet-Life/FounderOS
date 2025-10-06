# FounderOS 🚀

**The final CLI for builders. Bootstrap your next company in one command.**

FounderOS is a complete ecosystem for rapidly validating and building startup ideas. It consists of two main components:

1. **CLI Tool** - Interactive command-line tool for bootstrapping new projects with your preferred tech stack
2. **Landing Website** - Dark-themed Next.js marketing site with Stripe payments and Clerk waitlist

## 🎯 Quick Start

### CLI Tool

```bash
# Navigate to CLI directory
cd cli

# Build the tool
go build -o founder

# Run it
./founder

# Create a project
founder > found my-awesome-startup
```

### Website

```bash
# From project root
npm install

# Copy environment template
cp website/env.template website/.env.local

# Add your Clerk & Stripe keys to website/.env.local

# Start dev server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
FounderOS/
├── cli/                  # Go-based CLI tool
│   ├── main.go          # CLI application code
│   ├── founder          # Compiled binary
│   ├── SETUP.md         # Detailed CLI setup instructions
│   └── QUICKSTART.md    # Quick usage guide
│
├── website/             # Next.js landing page
│   ├── app/            # Next.js 15 App Router
│   ├── components/     # React components (Terminal, Cards, etc.)
│   ├── config/         # Site configuration
│   ├── SETUP.md        # Detailed website setup instructions
│   └── env.template    # Environment variables template
│
└── package.json        # Root package.json for website commands
```

## 🛠️ CLI Tool Features

✨ **Interactive CLI** - Beautiful, colorful prompts guide you through project setup  
⚡ **Multiple Tech Stacks** - Support for popular backend and frontend frameworks  
🎨 **Beautiful UI** - Colorful output with progress bars and emoji icons  
🔧 **Customizable** - Choose from multiple backend languages, frameworks, and features  
📦 **Long-running Session** - Create multiple projects without restarting

### Supported Stacks

**Backend Languages:**

- TypeScript (Node.js)
- Python
- Go
- Rust

**Backend Frameworks:**

- **TypeScript**: Express.js, NestJS, Fastify, Koa
- **Python**: FastAPI, Django, Flask, Tornado
- **Go**: Gin, Echo, Fiber, Chi
- **Rust**: Actix-web, Rocket, Axum, Warp

**Frontend Technologies:**

- React
- Next.js
- Vue
- Nuxt
- Angular
- Svelte

**Additional Features:**

- Message Queues
- Caching Layer
- Logging System
- Scheduled Jobs

## 🌐 Website Features

**Dark Theme Design:**

- Sleek zinc color palette
- Red-orange gradient accents
- IBM Plex Mono font
- Modern, polished interface

**Components:**

- Interactive terminal hero section
- Responsive navigation
- Pricing cards with Stripe integration
- Clerk waitlist integration
- FAQ section
- Benefits showcase

**Tech Stack:**

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS 4
- Clerk Authentication
- Stripe Payments
- Lucide Icons

## 📚 Detailed Documentation

- **CLI Setup**: See `cli/SETUP.md` for detailed installation and configuration
- **CLI Quick Start**: See `cli/QUICKSTART.md` for quick usage examples
- **Website Setup**: See `website/SETUP.md` for environment variables and deployment

## 🚀 Development Commands

All commands should be run from the project root:

```bash
# Website development
npm run dev              # Start Next.js dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# CLI development
cd cli
go build -o founder      # Build CLI tool
./founder                # Run CLI tool
```

## 🎨 Design Philosophy

FounderOS embraces a **terminal-first aesthetic** with:

- Deep blacks and zinc grays
- Red-orange gradient accents
- Monospace fonts (IBM Plex Mono)
- Terminal-inspired UI elements
- Clean, modern components

The design reflects the developer-focused nature of the product while maintaining a professional, polished appearance.

## 📋 Requirements

**CLI:**

- Go 1.21 or later

**Website:**

- Node.js 18+
- npm or yarn
- Clerk account (for authentication/waitlist)
- Stripe account (for payments)

## 🔐 Environment Variables

The website requires several environment variables. Copy `website/env.template` to `website/.env.local` and configure:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

See `website/SETUP.md` for detailed configuration instructions.

## 🤝 Contributing

This is a demo project showcasing modern web development and CLI tooling patterns. Feel free to use it as a template for your own projects!

## 📝 License

ISC License - Use freely for your projects.

## 🎉 Credits

Built for builders who want to validate fast and ship faster.

---

**Need help?** Check the detailed setup guides:

- CLI: `cli/SETUP.md`
- Website: `website/SETUP.md`
