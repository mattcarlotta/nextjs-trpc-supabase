import { TRPCError } from "@trpc/server";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { result } from "~/utils";
import { createClient, supabaseAdmin } from "../supabase/server";
import { sessionSchema, signinSchema } from "../zod/auth";
import { active_published_statuses, courseListing, courseListings, updateCourseListing, url } from "../zod/courses";
import { baseProcedure, createTRPCRouter } from "./init";

export const appRouter = createTRPCRouter({
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
    getCourseDetailsForEditing: baseProcedure
        .output(z.object({ course: courseListing.nullable(), error: z.string().nullable() }))
        .input(z.object({ url }))
        .query(async ({ input }) => {
            const supabase = await createClient();

            const {
                data: { user }
            } = await supabase.auth.getUser();

            if (!user?.id) {
                return {
                    course: null,
                    error: "You must be logged in to do that"
                };
            }

            const { data: course, error } = await supabase
                .from("courses")
                .select(
                    "id, title, description, price, sale_price, url, status, created_at, updated_at, author:users(id, first_name, last_name)"
                )
                .eq("url", input.url)
                .eq("author_id", user.id)
                .in("status", active_published_statuses)
                .single();

            if (error) {
                console.error(error.message);
                return {
                    course: null,
                    error: "Course either doesn't exist, was removed or you don't have permissions to edit this course."
                };
            }

            return { course, error: null };
        }),
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
    getSession: baseProcedure.output(sessionSchema.nullable()).query(async () => {
        const supabase = await createClient();
        const {
            data: { user }
        } = await supabase.auth.getUser();

        if (!user?.id) {
            return null;
        }

        const { data: userProfile } = await supabase
            .from("users")
            .select("id, first_name, last_name")
            .eq("id", user.id)
            .single();

        if (!userProfile) {
            return null;
        }

        return { email: user.email as string, ...userProfile };
    }),
    signIn: baseProcedure
        .output(sessionSchema)
        .input(signinSchema)
        .mutation(async ({ input }) => {
            const { data: hasAccount } = await supabaseAdmin.rpc("email_exists", {
                email_addr: input.email
            });

            if (!hasAccount) {
                throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid login credentials." });
            }

            const supabase = await createClient();
            const { error } = await supabase.auth.signInWithPassword(input);

            if (error) {
                console.error(error.message);
                throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid login credentials." });
            }

            const {
                data: { user }
            } = await supabase.auth.getUser();

            if (!user?.id) {
                throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Unable to locate user session." });
            }

            const { data: userProfile } = await supabase
                .from("users")
                .select("id, first_name, last_name")
                .eq("id", user.id)
                .single();

            if (!userProfile) {
                throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Unable to locate user session." });
            }

            return { email: user.email as string, ...userProfile };
        }),
    signOut: baseProcedure.mutation(async () => {
        const supabase = await createClient();

        const { error } = await result(supabase.auth.signOut());

        if (error) {
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Unable to locate user session." });
        }
    }),
    updateCourse: baseProcedure
        .output(updateCourseListing)
        .input(updateCourseListing)
        .mutation(async ({ input }) => {
            const supabase = await createClient();
            const {
                data: { user }
            } = await supabase.auth.getUser();

            if (!user?.id) {
                throw new TRPCError({ code: "UNAUTHORIZED", message: "You must be logged in to do that" });
            }

            const { data, error } = await supabase
                .from("courses")
                .update({
                    title: input.title,
                    description: input.description,
                    price: Math.round(input.price * 100),
                    sale_price: typeof input.sale_price === "number" ? Math.round(input.sale_price * 100) : null
                })
                .eq("url", input.url)
                .eq("author_id", user.id)
                .select("id, title, description, price, sale_price, url")
                .in("status", active_published_statuses)
                .single();

            if (error) {
                throw new TRPCError({ code: "BAD_REQUEST", message: error.message });
            }

            revalidateTag(`/course/${data.url}/`, "max");
            revalidateTag("/courses/", "max");

            return data;
        })
});

export type AppRouter = typeof appRouter;
