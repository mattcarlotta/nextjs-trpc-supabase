import { type NextRequest } from "next/server";
import { updateSession } from "~/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
    return await updateSession(request);
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - .well-known
         * - sitemaps - .xml
         * - robots.txt
         * - favicon.ico (favicon file)
         * - manifest.json
         * - images - .ico, .svg, .png, .jpg, .jpeg, .gif, .webp
         */
        "/((?!_next/static|_next/image|\\.well-known|.*sitemap\\.xml|robots\\.txt|favicon\\.ico|manifest\\.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml)$).*)"
    ]
};
