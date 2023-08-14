import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest, res: NextResponse) {
  const response = NextResponse.next();

  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/*",
};

// Conditional based on path
// if (request.nextUrl.pathname.startsWith('/about')) {
//   return NextResponse.rewrite(new URL('/about-2', request.url))
// }
