import type { NextRequest } from "next/server";
import type { Database } from "~/database.types";
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import "server-only";
import { result } from "~/utils";

export const updateSession = async (request: NextRequest) => {
    let response = NextResponse.next({ request });

    const supabase = createServerClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
        cookies: {
            getAll() {
                return request.cookies.getAll();
            },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
                response = NextResponse.next({ request });
                cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
            }
        }
    });

    await result(supabase.auth.getClaims());

    return response;
};
