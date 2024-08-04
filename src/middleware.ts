import { apiAuthPrefix, authRoutes, DEFAUTL_AUTH_REDIRECT, DEFAUTL_UNAUTH_REDIRECT, publicRoutes } from "./routes"

import { auth } from "./auth"

export default auth((req) => {
    try {
        let path = req.nextUrl?.pathname
        const isLoggedIn = !!req.auth

        const isApiAuthRoute = path.startsWith(apiAuthPrefix)
        const isPublicRoute = publicRoutes.includes(path)
        const isAuthRoute = authRoutes.includes(path)

        if (isApiAuthRoute) {
            return;
        }

        if (isAuthRoute) {
            if (isLoggedIn) return Response.redirect(new URL(DEFAUTL_AUTH_REDIRECT, req.nextUrl))
            return;
        }

        if (!isLoggedIn && !isPublicRoute) {
            return Response.redirect(new URL(DEFAUTL_UNAUTH_REDIRECT, req.nextUrl))
        }

    } catch (error) {
        console.log({ error })
        return Response.redirect(new URL('/', req.nextUrl))
    }

})

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ]
}