"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { reset: () => void }) {
    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-120 rounded-xl border border-neutral-800 bg-neutral-900 p-6 text-white shadow-lg">
                <div className="mb-6 text-center">
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-700/25">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                            <path d="M12 9v4" />
                            <path d="M12 17h.01" />
                        </svg>
                    </div>
                    <h1 className="mb-2 text-xl font-extrabold">Something went wrong</h1>
                    <p className="text-sm text-gray-300">A critical error occurred. Please try refreshing the page.</p>
                </div>
                <div className="flex justify-center gap-x-2">
                    <button
                        type="button"
                        className="flex cursor-pointer items-center gap-x-1.5 rounded-lg border border-gray-300 px-4 py-1"
                        onClick={reset}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                            <path d="M21 3v5h-5" />
                        </svg>
                        <p>Try again</p>
                    </button>
                    <Link
                        href="/"
                        className="inline-flex cursor-pointer items-center gap-x-1.5 rounded-lg bg-white px-4 py-1 font-medium text-black"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
