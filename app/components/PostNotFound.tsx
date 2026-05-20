"use client";

import Link from "next/link";

export function PostNotFound({ error }: { error: string }) {
    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-120 divide-y divide-neutral-200 rounded-xl border border-neutral-300 bg-white shadow-lg dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900">
                <main className="space-y-4 px-6 pt-4 pb-10 font-sans">
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-1 text-sm text-neutral-500 transition-colors hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400"
                    >
                        <p className="transition-transform group-hover:-translate-x-1" aria-hidden>
                            ←
                        </p>
                        <p>Back to posts</p>
                    </Link>
                    <div className="space-y-4">
                        <h1 className="text-3xl font-semibold">Oops! Something went wrong.</h1>
                        <p className="font-medium text-red-500">{error}</p>
                    </div>
                </main>
            </div>
        </div>
    );
}
