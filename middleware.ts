import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware() {
        return NextResponse.next()
    },
    {
        callbacks: {
            authorized({ req, token }) {
                const { pathname } = req.nextUrl

                // Public routes
                if (
                    pathname.startsWith("/api/auth") ||
                    pathname === "/login" ||
                    pathname === "/register"
                ) return true

                // Semi-public routes (e.g., homepage, view-only content)
                if (
                    pathname === "/" ||
                    pathname.startsWith("/api/videos")
                ) return true

                // Protected: everything else requires token
                return !!token
            }
        }
    }
)


export const config = {
    matcher: [
        "/((?!_next|favicon.ico|images|public).*)", // everything except these
    ]
}
