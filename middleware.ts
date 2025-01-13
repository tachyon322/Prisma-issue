import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { DEFAULT_REDIRECT, publicRoutes, apiRoute, authRoutes, helloRoute } from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  console.log("IS LOGGED IN:", isLoggedIn);

  const privateRoute = authRoutes.includes(nextUrl.pathname);

  if ( privateRoute && !isLoggedIn) {
    return Response.redirect(new URL("/login", req.url));
  }

  if (helloRoute === nextUrl.pathname && isLoggedIn) {
    return Response.redirect(new URL("/newest", req.url));
  }
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};