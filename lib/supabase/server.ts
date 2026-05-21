import type { Database } from "~/database.types";
import { createServerClient } from "@supabase/ssr";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import "server-only";
import { resultSync } from "~/utils";

export const createClient = async () => {
    const cookieStore = await cookies();

    return createServerClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
        cookies: {
            getAll() {
                return cookieStore.getAll();
            },
            setAll(cookiesToSet) {
                for (const { name, value, options } of cookiesToSet) {
                    resultSync(cookieStore.set, name, value, options);
                }
            }
        }
    });
};

export const supabaseAdmin = createAdminClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!, {
    auth: {
        persistSession: false,
        autoRefreshToken: false
    }
});
