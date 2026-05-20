// import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "./init";

const POSTS = [
    { id: "1", title: "Hello tRPC", body: "First post" },
    { id: "2", title: "App Router rocks", body: "Second post" },
    { id: "3", title: "Zod is great", body: "Third post" }
];

export const appRouter = createTRPCRouter({
    hello: baseProcedure
        .input(z.object({ name: z.string().min(1) }))
        .query(({ input }) => ({ greeting: `Hello, ${input.name}!` })),

    listPosts: baseProcedure.query(() => POSTS),

    getPost: baseProcedure.input(z.object({ id: z.string() })).query(({ input }) => {
        const post = POSTS.find((p) => p.id === input.id);

        if (!post) {
            return { post: null, error: `Post ${input.id} may have been deleted or does not exist.` };
            // throw new TRPCError({
            //     code: "NOT_FOUND",
            //     message: `Post ${input.id} not found`
            // });
        }

        return { post, error: null };
    })
});

export type AppRouter = typeof appRouter;
