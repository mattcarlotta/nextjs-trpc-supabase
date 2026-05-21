import { z } from "zod";
import { supabaseAdmin } from "../supabase/server";
import { active_published_statuses, courseListing, courseListings, url } from "../zod/courses";
import { baseProcedure, createTRPCRouter } from "./init";

export const appRouter = createTRPCRouter({
    courses: baseProcedure.output(courseListings).query(async () => {
        const { data, error } = await supabaseAdmin
            .from("courses")
            .select(
                "id, title, description,  price, sale_price, url, status, created_at, updated_at, author:users(id, first_name, last_name) "
            )
            .in("status", active_published_statuses);

        if (error) {
            console.error(error.message);
            return null;
        }

        return data;
    }),

    getCourse: baseProcedure
        .output(z.object({ course: courseListing.nullable(), error: z.string().nullable() }))
        .input(z.object({ url }))
        .query(async ({ input }) => {
            const { data: course, error } = await supabaseAdmin
                .from("courses")
                .select(
                    "id, title, description,  price, sale_price, url, status, created_at, updated_at, author:users(id, first_name, last_name) "
                )
                .eq("url", input.url)
                .in("status", active_published_statuses)
                .single();

            if (error) {
                console.error(error.message);
                return { course: null, error: "Course either doesn't exist or was removed." };
            }

            return { course, error: null };
        })
});

export type AppRouter = typeof appRouter;
