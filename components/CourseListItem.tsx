import type { CourseListing } from "~/lib/zod/courses";
import Link from "next/link";
import SVGVideoPlayerIcon from "~/icons/SVGVideoPlayerIcon";
import { toUSDCurrency } from "~/lib/currency";
import { cn } from "~/lib/tw";
import { toCustomLocaleString } from "~/utils/date";

export default function CourseListItem({ course }: { course: CourseListing }) {
    return (
        <li
            className={cn(
                "group w-full max-w-92.5 overflow-hidden rounded-lg border border-neutral-400 bg-white drop-shadow-md md:h-100",
                "focus-within:border-blue-700 focus-within:drop-shadow-xl/30 hover:border-blue-700 hover:drop-shadow-xl/30",
                "dark:border-neutral-600 dark:bg-neutral-800"
            )}
        >
            <section>
                <Link
                    aria-label={`View ${course.title} by ${course.author.first_name} ${course.author.last_name} detail page`}
                    href={`/course/${course.url}/`}
                >
                    <div
                        aria-hidden
                        className="flex h-48 w-full flex-col items-center justify-center border-b border-neutral-400 text-neutral-400 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-400"
                    >
                        <SVGVideoPlayerIcon className="h-25 w-25" />
                        <p className="text-lg">Missing Video Thumbnail</p>
                    </div>
                    <div aria-hidden className="flex h-40.5 flex-col space-y-2 p-3.5">
                        <header>
                            <h2 className="line-clamp-1 font-bold md:text-lg md:leading-7">{course.title}</h2>
                        </header>
                        <div className="-mt-2.5">
                            <time
                                className="text-xxs block text-neutral-500 dark:text-neutral-400"
                                dateTime={course.created_at.toISOString()}
                                title={toCustomLocaleString(course.created_at)}
                            >
                                {toCustomLocaleString(course.created_at)}
                            </time>
                            <p className="line-clamp-2 text-xs font-semibold tracking-wide">
                                by {course.author.first_name} {course.author.last_name}
                            </p>
                        </div>
                        <p className="p3 line-clamp-3">{course.description}</p>
                    </div>
                    <div
                        aria-hidden
                        className={cn(
                            "flex h-11 w-full items-center justify-center border-t border-neutral-400 bg-blue-500 text-lg font-semibold text-white dark:border-neutral-600 dark:bg-blue-600",
                            "p3 group-focus-within:bg-blue-500 group-focus-within:text-white group-hover:border-blue-500 group-hover:bg-blue-500 group-hover:text-white",
                            "group-focus-within:border-blue-500 dark:border-neutral-700"
                        )}
                    >
                        <p>{course.price === 0 ? "Free" : toUSDCurrency(course.price / 100)}</p>
                    </div>
                </Link>
            </section>
        </li>
    );
}
