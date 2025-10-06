# Website Setup Guide 🌐

Complete setup instructions for the FounderOS marketing website.

## Prerequisites

- **Node.js 18+** - [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Clerk Account** - [Sign up at clerk.com](https://clerk.com)
- **Stripe Account** - [Sign up at stripe.com](https://stripe.com)

## Installation

### 1. Install Dependencies

From the **project root** (not the website directory):

```bash
npm install
```

This will install all dependencies listed in `package.json`.

### 2. Configure Environment Variables

#### Copy the Template

```bash
cp website/env.template website/.env.local
```

#### Get Your API Keys

**Clerk Keys:**

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Create or select your application
3. Navigate to **API Keys**
4. Copy both:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (starts with `pk_test_` or `pk_live_`)
   - `CLERK_SECRET_KEY` (starts with `sk_test_` or `sk_live_`)

**Stripe Keys:**

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Make sure you're in **Test Mode** (toggle in top right)
3. Navigate to **Developers → API Keys**
4. Copy both:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (starts with `pk_test_`)
   - `STRIPE_SECRET_KEY` (starts with `sk_test_`)

#### Update .env.local

Edit `website/.env.local`:

```env
# Clerk (authentication & waitlist)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx

# Stripe (payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Demo view lock
# NEXT_PUBLIC_DEMO_VIEW_LOCK=desktop
```

### 3. Configure Stripe Products

#### Create Products in Stripe Dashboard

1. Go to [Stripe Dashboard → Products](https://dashboard.stripe.com/test/products)
2. Click **Add Product**
3. Create three products (Starter, Pro, Enterprise)
4. For each product:
   - Add name and description
   - Create a **recurring price** (monthly)
   - Copy the **Price ID** (starts with `price_`)

#### Update Site Config

Edit `website/config/site.ts`:

```typescript
pricing: {
  plans: [
    {
      name: "Starter",
      price: "$9",
      priceId: "price_1234567890", // Your Stripe Price ID
      description: "Perfect for trying out",
      features: ["Feature 1", "Feature 2", "Feature 3"],
    },
    // ... more plans
  ],
}
```

## Development

### Start the Dev Server

From the **project root**:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Other Commands

From the **project root**:

```bash
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Project Structure

```
website/
├── app/
│   ├── page.tsx                      # Landing page
│   ├── pricing/page.tsx              # Pricing page with checkout
│   ├── success/page.tsx              # Post-checkout success
│   ├── layout.tsx                    # Root layout with providers
│   ├── globals.css                   # Dark theme styles
│   └── api/create-checkout-session/  # Stripe API route
│
├── components/
│   ├── Navbar.tsx                    # Navigation bar
│   ├── Terminal.tsx                  # Terminal content
│   ├── TerminalWindow.tsx           # Terminal window chrome
│   ├── PricingCards.tsx             # Pricing card grid
│   ├── BenefitCard.tsx              # Benefit showcase cards
│   └── HowItWorksCard.tsx           # Step-by-step cards
│
├── config/
│   └── site.ts                       # All site content
│
├── lib/
│   └── stripe.ts                     # Stripe SDK instance
│
├── middleware.ts                     # Clerk auth middleware
├── env.template                      # Environment template
├── next.config.ts                    # Next.js configuration
├── tsconfig.json                     # TypeScript config
└── postcss.config.mjs               # PostCSS/Tailwind config
```

## Configuration

### Site Content

Edit `config/site.ts` to customize all site content:

```typescript
export const siteConfig = {
  name: "FounderOS",
  description: "Your description",

  nav: {
    landing: "/",
    pricing: "/pricing",
  },

  pricing: {
    plans: [
      /* your pricing plans */
    ],
  },

  landing: {
    hero: {
      title: "Your Hero Title",
      subtitle: "Your subtitle",
      cta: "Join Waitlist",
    },
    features: [
      /* your features */
    ],
    faq: [
      /* your FAQs */
    ],
  },
};
```

### Customizing the Terminal

Edit `components/Terminal.tsx` to customize the terminal content:

```tsx
<TerminalWindow>
  <div className="space-y-4">
    <div className="flex items-center">
      <span className="text-zinc-500 mr-2">$</span>
      <span className="text-zinc-300">your-command</span>
    </div>
    {/* Add your custom terminal output */}
  </div>
</TerminalWindow>
```

The `TerminalWindow` component provides the window chrome (styling, header, dots) and is reusable.

## Key Features

### Dark Theme

- Zinc color palette (`zinc-950`, `zinc-900`, `zinc-800`)
- Red-orange gradient accents (`from-red-500 to-orange-500`)
- Deep blacks for contrast
- IBM Plex Mono font

### Clerk Integration

- Waitlist component with dark theme styling
- Authentication middleware
- Session management

### Stripe Integration

- Checkout session creation
- Success page handling
- Test mode support

### Responsive Design

- Mobile-first approach
- Responsive navigation with mobile menu
- Flexible grid layouts
- Touch-friendly interactions

## Testing

### Test Stripe Checkout

Use these test cards in Stripe:

| Card Number           | Description             |
| --------------------- | ----------------------- |
| `4242 4242 4242 4242` | Successful payment      |
| `4000 0000 0000 9995` | Declined payment        |
| `4000 0025 0000 3155` | Requires authentication |

Use any future expiry date and any 3-digit CVC.

### Test Clerk Waitlist

1. Visit [http://localhost:3000/#waitlist](http://localhost:3000/#waitlist)
2. Enter an email address
3. Check Clerk Dashboard to see the signup

## Deployment

### Vercel (Recommended)

1. **Connect Repository:**

   - Go to [vercel.com](https://vercel.com)
   - Import your Git repository
   - Select the `website` directory as the root

2. **Configure Build Settings:**

   ```
   Framework Preset: Next.js
   Root Directory: website
   Build Command: npm run build
   Output Directory: (leave default)
   Install Command: npm install
   ```

3. **Add Environment Variables:**
   Add all variables from `.env.local` in Vercel dashboard:

   - Use **production** keys (`pk_live_`, `sk_live_`)
   - Set `NEXT_PUBLIC_APP_URL` to your domain

4. **Deploy:**
   - Click Deploy
   - Vercel will build and deploy automatically

### Other Platforms

For other platforms (Netlify, Railway, etc.):

1. Set root directory to `website`
2. Build command: `cd website && npm run build`
3. Add all environment variables
4. Deploy

## Troubleshooting

### "Clerk is not defined"

**Problem:** Clerk components not working

**Solution:**

```bash
# Ensure Clerk keys are in .env.local
# Restart dev server
npm run dev
```

### "Invalid Stripe Key"

**Problem:** Stripe API calls failing

**Solution:**

```bash
# Verify keys in .env.local
# Ensure they're prefixed correctly:
# - pk_test_ for publishable key
# - sk_test_ for secret key
# Restart dev server
```

### Build Errors

**"Module not found"**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**"Type errors"**

```bash
# Regenerate TypeScript types
npm run build
```

### Styling Issues

**"Tailwind classes not working"**

```bash
# Ensure Tailwind is processing correctly
# Check postcss.config.mjs exists
# Restart dev server
```

## Environment Variables Reference

### Required

| Variable                             | Description       | Example                 |
| ------------------------------------ | ----------------- | ----------------------- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`  | Clerk public key  | `pk_test_xxxxx`         |
| `CLERK_SECRET_KEY`                   | Clerk secret key  | `sk_test_xxxxx`         |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe public key | `pk_test_xxxxx`         |
| `STRIPE_SECRET_KEY`                  | Stripe secret key | `sk_test_xxxxx`         |
| `NEXT_PUBLIC_APP_URL`                | Your app URL      | `http://localhost:3000` |

### Optional

| Variable                     | Description                      | Default |
| ---------------------------- | -------------------------------- | ------- |
| `NEXT_PUBLIC_DEMO_VIEW_LOCK` | Lock demo view to mobile/desktop | none    |

## Security Notes

### API Keys

- ⚠️ Never commit `.env.local` to version control
- ⚠️ Keep secret keys (`sk_`) server-side only
- ✅ Use test keys in development
- ✅ Use production keys only in production

### Public Keys

- Public keys (`pk_`) are safe to expose in browser
- They're prefixed with `NEXT_PUBLIC_` in Next.js

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript 5.9** - Type safety
- **Tailwind CSS 4** - Utility-first styling
- **Clerk** - Authentication and waitlist
- **Stripe** - Payment processing
- **Lucide React** - Icon library
- **IBM Plex Mono** - Monospace font

## Need Help?

- Review the main `README.md` in the project root
- Check [Next.js Documentation](https://nextjs.org/docs)
- Check [Clerk Documentation](https://clerk.com/docs)
- Check [Stripe Documentation](https://stripe.com/docs)

---

Built for builders who want to ship fast 🚀
