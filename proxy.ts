import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const getPublicPath = (value: string | undefined, fallback: string) => {
  if (!value) return fallback;

  try {
    const url = new URL(value);
    return url.pathname || fallback;
  } catch {
    return value.startsWith("/") ? value : `/${value}`;
  }
};

const signInPath = getPublicPath(
  process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
  "/sign-in",
);
const signUpPath = getPublicPath(
  process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
  "/sign-up",
);

const isPublicRoute = createRouteMatcher([
  "/",
  signInPath,
  signUpPath,
  "/api/projects(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
