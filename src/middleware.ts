import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest, res: NextResponse) {
  // console.log("HELLO from middleware: ", res);
  // return NextResponse.redirect(new URL("/home", req.url));
}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: "/my-tasks/board",
};

// Conditional based on path
// if (request.nextUrl.pathname.startsWith('/about')) {
//   return NextResponse.rewrite(new URL('/about-2', request.url))
// }
