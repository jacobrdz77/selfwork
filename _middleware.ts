import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getSession } from "next-auth/react";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession();
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/*",
};
