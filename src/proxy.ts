import { auth } from "@/lib/auth/server";

export default auth.middleware({
  loginUrl: "/login",
  publicRoutes: ["/", "/login", "/register"],
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
