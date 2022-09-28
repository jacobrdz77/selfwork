import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  console.log("USING MIDDLEWARE");
  const token = await getToken({ req: request });
  console.log("TOKEN: ", token);

  const { pathname } = request.nextUrl;
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirects to login if NOT authenticated
  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.redirect(new URL("", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/",
};
