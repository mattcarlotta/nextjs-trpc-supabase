import { revalidateTag } from "next/cache";
import { z } from "zod";
import { supabaseAdmin } from "../supabase/server";
import { active_published_statuses, courseListing, courseListings, updateCourseListing, url } from "../zod/courses";
import { baseProcedure, createTRPCRouter } from "./init";

export const appRouter = createTRPCRouter({
    getCourses: baseProcedure.output(courseListings).query(async () => {
        const { data, error } = await supabaseAdmin
            .from("courses")
            .select(
                "id, title, description, price, sale_price, url, status, created_at, updated_at, author:users(id, first_name, last_name)"
            )
            .in("status", active_published_statuses)
            .order("created_at", { ascending: true });

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
                    "id, title, description, price, sale_price, url, status, created_at, updated_at, author:users(id, first_name, last_name)"
                )
                .eq("url", input.url)
                .in("status", active_published_statuses)
                .single();

            if (error) {
                console.error(error.message);
                return { course: null, error: "Course either doesn't exist or was removed." };
            }

            return { course, error: null };
        }),
    updateCourse: baseProcedure
        .output(z.object({ course: updateCourseListing.nullable(), error: z.string().nullable() }))
        .input(updateCourseListing)
        .mutation(async ({ input }) => {
            const updatedCourseDetails = {
                title: input.title,
                description: input.description,
                price: Math.round(input.price * 100),
                sale_price: typeof input.sale_price === "number" ? Math.round(input.sale_price * 100) : null
            };

            const { data: course, error } = await supabaseAdmin
                .from("courses")
                .update(updatedCourseDetails)
                .eq("url", input.url)
                .select("id, title, description, price, sale_price, url")
                .in("status", active_published_statuses)
                .single();

            if (error) {
                console.error(error.message);
                return { course: null, error: "Course either doesn't exist or was removed." };
            }

            revalidateTag(`/course/${input.url}/`, "max");
            revalidateTag("/courses/", "max");

            return { course, error: null };
        })
});

export type AppRouter = typeof appRouter;
