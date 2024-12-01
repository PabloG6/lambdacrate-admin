import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    const currentUser = request.cookies.get("LAMBDACRATE_AUTH")?.value
 
    if (!currentUser && request.nextUrl.pathname.startsWith('/dashboard')) {
      return Response.redirect(new URL('/login', request.url))
    }



}