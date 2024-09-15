import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", // Matches all routes except those containing a dot (e.g., file extensions) or `_next`
    "/", // Matches the root
    "/(api|trpc)(.*)", // Matches API and trpc routes
  ],
};

// If you need to set public routes, you can specify them in the `config` section of Clerk's dashboard
// or use environment variables like `NEXT_PUBLIC_CLERK_PUBLIC_ROUTES`.
