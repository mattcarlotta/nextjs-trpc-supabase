import Link from "next/link";
import { cn } from "~/lib/tw";

export default function BackToCoursesLink() {
    return (
        <Link
            href="/"
            className={cn(
                "group inline-flex max-w-max items-center gap-1 self-start text-sm text-neutral-500 transition-colors",
                "hover:text-blue-600",
                "focus-visible:text-blue-600 focus-visible:outline-none",
                "dark:text-neutral-400 dark:hover:text-blue-400 dark:focus-visible:text-blue-400"
            )}
        >
            <p className="transition-transform group-hover:-translate-x-1" aria-hidden>
                ←
            </p>
            <p>Back to courses</p>
        </Link>
    );
}
