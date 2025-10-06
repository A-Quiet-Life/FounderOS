# Lib Folder

This folder contains shared utility modules and SDK configurations.

## Modules

### `stripe.ts`

Configured Stripe SDK instance using the latest API version.

**Features:**

- Lazy initialization (only loads when actually used)
- Singleton pattern (reuses the same instance)
- TypeScript support enabled
- Automatic error handling for missing keys

**Usage:**

```typescript
import { stripe } from "@/lib/stripe";

// Create a checkout session
const session = await stripe.checkout.sessions.create({
  payment_method_types: ["card"],
  line_items: [...],
  mode: "subscription",
  success_url: "...",
  cancel_url: "...",
});

// Create a customer
const customer = await stripe.customers.create({
  email: "customer@example.com",
});

// List products
const products = await stripe.products.list();
```

**Error Handling:**

If `STRIPE_SECRET_KEY` is not set in your environment variables, the module will throw a helpful error message:

```
STRIPE_SECRET_KEY is not set in environment variables.
Please add it to your .env.local file for development or
environment variables for production.
```

**API Version:**

This module uses Stripe API version `2025-09-30.clover` (latest as of template creation).

To update to a newer version, edit the `apiVersion` in `lib/stripe.ts`:

```typescript
stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-XX-XX.xxxxx", // Update this
  typescript: true,
});
```

Check [Stripe's API versioning guide](https://stripe.com/docs/api/versioning) for the latest version.

## Adding More Modules

To add more utility modules:

1. Create a new file in `lib/` (e.g., `lib/db.ts`, `lib/email.ts`)
2. Export your utilities
3. Import using the `@/lib/` alias

Example:

```typescript
// lib/email.ts
export async function sendEmail(to: string, subject: string, body: string) {
  // Implementation
}

// Usage in your app
import { sendEmail } from "@/lib/email";
```
