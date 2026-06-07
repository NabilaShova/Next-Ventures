import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";
import { isClerkConfigured } from "@/lib/clerk-config";

const intlMiddleware = createMiddleware(routing);

let middleware: typeof intlMiddleware = intlMiddleware;

if (isClerkConfigured()) {
  const { clerkMiddleware, createRouteMatcher } = require("@clerk/nextjs/server");
  const isProtectedRoute = createRouteMatcher([
    "/:locale/admin(.*)",
    "/admin(.*)",
    "/api/admin(.*)",
  ]);

  middleware = clerkMiddleware(async (auth: { protect: () => Promise<void> }, request: Request) => {
    if (isProtectedRoute(request)) {
      await auth.protect();
    }
    return intlMiddleware(request);
  });
}

export default middleware;

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
