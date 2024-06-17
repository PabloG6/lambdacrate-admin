import { NextRequest } from "next/server"
import { sessionCookieName } from "./lib/auth/lucia"

export default function middleware(request: NextRequest) {
    const currentUser = request.cookies.get(sessionCookieName)?.value
 
    if (!currentUser && request.nextUrl.pathname.startsWith('/dashboard')) {
      return Response.redirect(new URL('/login', request.url))
    }



}