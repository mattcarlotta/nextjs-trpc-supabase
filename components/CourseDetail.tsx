import type { CourseListing } from "~/lib/zod/courses";
import { cn } from "~/lib/tw";
import { timeSince, toCustomLocaleString } from "~/utils/date";
import BackToCoursesLink from "./BackToCoursesLink";
import EditCourseLink from "./EditCourseLink";
import Main from "./Main";

export function CourseDetail({ course }: { course: CourseListing }) {
    return (
        <div className="flex items-center justify-center pt-20">
            <div
                className={cn(
                    "w-full max-w-220 divide-y divide-neutral-200 rounded-xl border border-neutral-300 bg-white shadow-lg",
                    "dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900"
                )}
            >
                <Main className="space-y-4">
                    <div className="flex w-full items-center justify-between">
                        <BackToCoursesLink />
                        <EditCourseLink courseURL={course.url} />
                    </div>
                    <article className="w-full space-y-4 px-4">
                        <div className="space-y-1">
                            <header className="flex items-center space-x-2" id="course">
                                <h1 data-testid="course-title" className="text-3xl font-semibold md:text-5xl">
                                    {course?.title}
                                </h1>
                            </header>
                            <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-2">
                                <p>Share</p>
                                <p>QR Code</p>
                            </div>
                        </div>
                        <a
                            aria-label={`Visit ${course?.author?.first_name} ${course?.author?.last_name}'s profile page (opens in a new window)`}
                            target="_blank"
                            referrerPolicy="no-referrer"
                            className="group flex max-w-max items-center space-x-2"
                            href={`/user/${course?.author?.id}/`}
                        >
                            <p className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-xl text-white uppercase">
                                {course?.author?.first_name?.charAt(0)}
                                {course?.author?.last_name?.charAt(0)}
                            </p>
                            <div className="flex flex-col space-x-0.5">
                                <p className="text-blue-500 group-hover:underline dark:text-blue-400">
                                    {course?.author?.first_name} {course?.author?.last_name}
                                </p>
                                {course?.created_at && (
                                    <time
                                        className="text-xxs text-neutral-500 dark:text-neutral-400"
                                        dateTime={course.created_at.toISOString()}
                                        title={toCustomLocaleString(course.created_at)}
                                    >
                                        Published&nbsp;
                                        {toCustomLocaleString(course.created_at)}
                                    </time>
                                )}
                                {course?.updated_at && (
                                    <time
                                        dateTime={course.updated_at.toISOString()}
                                        title={toCustomLocaleString(course.updated_at)}
                                        className="text-xxs text-neutral-500 dark:text-neutral-400"
                                    >
                                        Updated&nbsp;{timeSince(course.updated_at)}
                                    </time>
                                )}
                            </div>
                        </a>
                        <p className="text-neutral-700 dark:text-neutral-300">{course?.description}</p>
                    </article>
                </Main>
            </div>
        </div>
    );
}
