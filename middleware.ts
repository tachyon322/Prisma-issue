import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { DEFAULT_REDIRECT, publicRoutes, apiRoute, authRoutes, helloRoute, loginAuthRoutes } from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const session = await auth();
  const isLoggedIn = !!session; // Проверка, есть ли сессия

  const privateRoute = authRoutes.includes(nextUrl.pathname);
  const isLoginRoutes = loginAuthRoutes.some((route) => route.path === nextUrl.pathname);
  
  if (isLoginRoutes && isLoggedIn) {
    return Response.redirect(new URL(`/user/${session.user.id}`, req.url)); // Редирект на пользователя
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
