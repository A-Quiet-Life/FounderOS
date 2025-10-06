import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/**
 * Clerk Middleware Configuration (Next.js App Router)
 *
 * This uses the CURRENT, CORRECT approach for Clerk + Next.js App Router.
 *
 * ✅ Uses clerkMiddleware() (not deprecated authMiddleware)
 * ✅ Imports from @clerk/nextjs/server
 * ✅ Uses createRouteMatcher for route protection
 *
 * Do NOT change to older patterns like authMiddleware() or Pages Router approach.
 */

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  "/",
  "/demo",
  "/pricing",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
