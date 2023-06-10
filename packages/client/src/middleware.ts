import { NextRequest, NextResponse } from "next/server";
import { baseURL } from "./services";
import { GuardRoles, Roles } from "@klavisha/types";
import { NextURL } from "next/dist/server/web/next-url";
import { UserResponse } from "./types/responses/user.response";

const parseCookie = (cookieName: string, cookies: string[]) =>
  cookies
    .find((cookie) => cookie.includes(cookieName))
    ?.match(new RegExp(`^${cookieName}=(.+?);`))?.[1];

type ProtectedRoute = {
  path: string;
  roles?: GuardRoles[];
};

const protectedRoutes: ProtectedRoute[] = [{ path: "/auth" }];

export const middleware = async (request: NextRequest) => {
  const route = protectedRoutes.find((route) =>
    request.nextUrl.pathname.startsWith(route.path)
  );

  if (!route) return NextResponse.next();

  try {
    const res = await fetch(`${baseURL}/auth/me`, {
      headers: {
        Cookie: request.cookies.toString(),
      },
    });

    if (!res.ok) {
      if (route.path.startsWith("/auth")) return NextResponse.next();
      else return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    const cookies = res.headers.get("set-cookie")?.split(", ") || [];
    const response = NextResponse.next();
    const redirect = NextResponse.redirect(new NextURL("/", request.url));

    const accessToken = parseCookie("accessToken", cookies);
    const refreshToken = parseCookie("refreshToken", cookies);

    if (accessToken) {
      response.cookies.set("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "none",
      });
      redirect.cookies.set("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "none",
      });
    }
    if (refreshToken) {
      response.cookies.set("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "none",
      });
      redirect.cookies.set("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "none",
      });
    }

    const user: UserResponse = await res.json();

    if (route.path.startsWith("/auth") && user) return redirect;

    if (!route.roles) return response;

    const hasAccess = route.roles?.some((role) => {
      switch (role) {
        case GuardRoles.STUDENT:
          return !!user.student;
        case GuardRoles.TEACHER:
          return !!user.teacher;
        case GuardRoles.INSTITUTION_ADMIN:
          return !!user.institutions;
        case GuardRoles.ADMIN:
          return user.role === Roles.ADMIN;
      }
    });

    if (!hasAccess) return redirect;

    return response;
  } catch {
    NextResponse.redirect(new URL("/auth/login", request.url));
  }
};
