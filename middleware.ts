import { authRoute, helloRoute, loginAuthRoutes } from "@/routes";

import { auth } from "./auth";
import { NextRequest } from "next/server";

export default auth(async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const session = await auth();
  const isLoggedIn = !!session;

  const privateRoute = authRoute.includes(nextUrl.pathname); // редирект с user на user/id {Я ХЗ КАК ОНО РАБОТАЛО ПОЭТОМУ ТАК}
  const isLoginRoutes = loginAuthRoutes.some(
    (route) => route.path === nextUrl.pathname
  );

  if (isLoginRoutes && isLoggedIn) {
    return Response.redirect(new URL(`/user/${session.user.id}`, req.url));
  }

  if (helloRoute === nextUrl.pathname && isLoggedIn) {
    return Response.redirect(new URL("/newest", req.url));
  }

  if (privateRoute && isLoggedIn) {
    return Response.redirect(new URL(`/user/${session.user.id}`, req.url));
  }

});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
