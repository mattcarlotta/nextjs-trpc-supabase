import Link from "next/link";
import SVGEditIcon from "~/icons/SVGEditIcon";
import { cn } from "~/lib/tw";

export default function EditCourseLink({ courseURL }: { courseURL?: string }) {
    if (!courseURL) {
        return (
            <div
                className={cn(
                    "flex max-w-max items-center gap-1 self-start text-sm text-neutral-500",
                    "dark:text-neutral-400"
                )}
            >
                <SVGEditIcon className="h-3 w-3" />
                <p>Edit</p>
            </div>
        );
    }

    return (
        <Link
            href={`/course-editor/${courseURL}/`}
            className={cn(
                "flex max-w-max items-center gap-1 self-start text-sm text-neutral-500 transition-colors",
                "hover:text-blue-600",
                "focus-visible:text-blue-600 focus-visible:outline-none",
                "dark:text-neutral-400 dark:hover:text-blue-400 dark:focus-visible:text-blue-400"
            )}
        >
            <SVGEditIcon className="h-3 w-3" />
            <p>Edit</p>
        </Link>
    );
}
