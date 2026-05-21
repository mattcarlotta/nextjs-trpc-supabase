"use client";

import Link from "next/link";
import SVGErrorIcon from "~/icons/SVGErrorIcon";
import SVGHomeIcon from "~/icons/SVGHomeIcon";
import SVGRetryIcon from "~/icons/SVGRetryIcon";

export default function ErrorPage({ reset }: { reset: () => void }) {
    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-120 rounded-xl border border-neutral-800 bg-neutral-900 p-6 text-white shadow-lg">
                <div className="mb-6 text-center">
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-700/25">
                        <SVGErrorIcon className="h-6 w-6" />
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
                        <SVGRetryIcon className="h-4 w-4" />
                        <p>Try again</p>
                    </button>
                    <Link
                        href="/"
                        className="inline-flex cursor-pointer items-center gap-x-1.5 rounded-lg bg-white px-4 py-1 font-medium text-black"
                    >
                        <SVGHomeIcon className="h-4 w-4" />
                        <p>Go Home</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
