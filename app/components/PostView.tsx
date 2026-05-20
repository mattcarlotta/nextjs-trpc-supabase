"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useTRPC } from "~/lib/trpc/client";
import { PostNotFound } from "./PostNotFound";

export function PostView({ postId }: { postId: string }) {
    const trpc = useTRPC();
    const {
        data: { post, error }
    } = useSuspenseQuery(trpc.getPost.queryOptions({ id: postId }));

    if (error) {
        return <PostNotFound error={error} />;
    }

    return (
        <div className="pt-20">
            <div className="mx-auto w-full max-w-120 divide-y divide-neutral-200 rounded-xl border border-neutral-300 bg-white shadow-lg dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900">
                <main className="space-y-4 px-6 pt-4 pb-10 font-sans">
                    <Link
                        href="/"
                        className="group mb-8 inline-flex items-center gap-1 text-sm text-neutral-500 transition-colors hover:text-blue-600 focus-visible:text-blue-600 focus-visible:outline-none dark:text-neutral-400 dark:hover:text-blue-400 dark:focus-visible:text-blue-400"
                    >
                        <p className="transition-transform group-hover:-translate-x-1" aria-hidden>
                            ←
                        </p>
                        <p>Back to posts</p>
                    </Link>
                    <article className="space-y-4">
                        <h1 className="text-3xl font-semibold tracking-tight">{post?.title}</h1>
                        <p className="text-neutral-700 dark:text-neutral-300">{post?.body}</p>
                    </article>
                </main>
            </div>
        </div>
    );
}
