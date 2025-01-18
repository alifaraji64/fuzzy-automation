import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(['/',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/api/clerk-webhook'
    ])

export default clerkMiddleware(async (auth, request) => {
    if (!isPublicRoute(request)) {
        console.log('bang');

        await auth.protect()
    }
})

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}