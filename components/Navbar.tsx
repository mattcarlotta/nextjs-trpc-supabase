import Link from "next/link";
import { cn } from "~/lib/tw";
import AuthNavbar from "./AuthNavbar";

export default async function Navbar() {
    return (
        <>
            <a
                className={cn(
                    "sr-only z-200 flex w-full max-w-max cursor-pointer items-center justify-center rounded-lg border border-blue-600 bg-blue-500 text-center text-lg font-semibold text-white transition-colors",
                    "hover:bg-blue-600",
                    "focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:p-2.5"
                )}
                href="#content"
            >
                Skip to content
            </a>
            <div className="flex h-20 items-center justify-center border-b border-neutral-300 bg-neutral-100 dark:border-neutral-600 dark:bg-neutral-900">
                <div className="flex w-full max-w-6xl items-center justify-between px-4 lg:px-0">
                    <Link className="hover:underline" href="/">
                        Logo
                    </Link>
                    <AuthNavbar />
                </div>
            </div>
        </>
    );
}
