"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useTRPC } from "~/lib/trpc/client";
import { cn } from "~/lib/tw";
import { PostsSkeleton } from "./components/PostsSkeleton";

export default function Page() {
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    const posts = useQuery(trpc.listPosts.queryOptions());

    return (
        <main className="mx-auto min-h-screen max-w-2xl bg-white px-6 py-12 font-sans text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
            <h1 className="mb-8 text-3xl font-semibold tracking-tight">TRPC Posts Example</h1>
            <section>
                <h2 className="mb-4 text-lg font-medium text-neutral-700 dark:text-neutral-300">Posts</h2>
                {posts.isLoading ? (
                    <PostsSkeleton />
                ) : (
                    <ul className="divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white shadow-sm dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900">
                        {posts.data?.map((p) => (
                            <li key={p.id}>
                                <Link
                                    href={`/post/${p.id}`}
                                    onMouseEnter={() =>
                                        queryClient.prefetchQuery(trpc.getPost.queryOptions({ id: p.id }))
                                    }
                                    className={cn(
                                        "group flex items-center justify-between px-4 py-3 transition-colors",
                                        "hover:bg-neutral-50 focus-visible:bg-neutral-50 focus-visible:outline-none dark:hover:bg-neutral-800 dark:focus-visible:bg-neutral-800"
                                    )}
                                >
                                    <span className="font-medium text-neutral-900 transition-colors group-hover:text-blue-600 dark:text-neutral-100 dark:group-hover:text-blue-400">
                                        {p.title}
                                    </span>
                                    <span
                                        className="text-sm text-neutral-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-600 dark:text-neutral-500 dark:group-hover:text-blue-400"
                                        aria-hidden
                                    >
                                        →
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
}
