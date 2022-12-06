import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "next-auth/react";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  console.log("MIDDLEWARE");
  const session = await getSession();
  const { pathname } = request.nextUrl;

  //*****  Checks authentication *****//
  if (session && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirects to login if NOT authenticated
  if (!session && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.redirect(new URL("", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/*",
};
