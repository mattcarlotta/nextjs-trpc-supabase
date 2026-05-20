import Link from "next/link";

export function PostSkeleton() {
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
                    <div className="space-y-4">
                        <div className="h-9 w-3/4 animate-pulse rounded bg-neutral-200 dark:bg-neutral-500" />
                        <div className="space-y-2">
                            <div className="h-4 w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-500" />
                            <div className="h-4 w-5/6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-500" />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
