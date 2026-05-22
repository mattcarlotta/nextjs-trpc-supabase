import type { CourseListing } from "~/lib/zod/courses";
import SVGVideoPlayerIcon from "~/icons/SVGVideoPlayerIcon";
import { cn } from "~/lib/tw";
import { timeSince, toCustomLocaleString } from "~/utils/date";
import BackToCoursesLink from "./BackToCoursesLink";
import CourseCTAButton from "./CourseCTAButton";
import EditCourseLink from "./EditCourseLink";
import Main from "./Main";

export function CourseDetail({ course }: { course: CourseListing }) {
    return (
        <div className="flex items-center justify-center lg:py-10">
            <div className="w-full max-w-6xl grid-cols-1 gap-4 lg:grid lg:grid-cols-4">
                <div
                    className={cn(
                        "divide-y divide-neutral-200 border border-neutral-300 bg-white shadow-lg lg:col-span-3 lg:rounded-lg",
                        "dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900"
                    )}
                >
                    <Main className="space-y-4">
                        <div className="flex w-full items-center justify-between">
                            <BackToCoursesLink />
                            <EditCourseLink courseURL={course.url} />
                        </div>
                        <article className="w-full space-y-4 lg:px-4">
                            <div className="space-y-1">
                                <header className="flex items-center space-x-2" id="course">
                                    <h1 data-testid="course-title" className="text-3xl font-semibold lg:text-5xl">
                                        {course?.title}
                                    </h1>
                                </header>
                                <div className="flex items-center space-x-2">
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
                                <p className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-lg text-white uppercase">
                                    {course?.author?.first_name?.charAt(0)}
                                    {course?.author?.last_name?.charAt(0)}
                                </p>
                                <div className="flex flex-col space-x-0.5">
                                    <p className="text-neutral-600 group-hover:underline dark:text-neutral-300">
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
                            <div
                                aria-hidden
                                className="flex h-48 w-full flex-col items-center justify-center text-neutral-400 lg:hidden dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-400"
                            >
                                <SVGVideoPlayerIcon className="h-25 w-25" />
                                <p className="text-lg">Missing Video Thumbnail</p>
                            </div>
                            <p className="text-neutral-700 dark:text-neutral-300">{course?.description}</p>
                        </article>
                        <div className="block w-full lg:hidden">
                            <CourseCTAButton
                                courseId={course?.id}
                                coursePrice={course?.price}
                                courseSalePrice={course?.sale_price}
                            />
                        </div>
                    </Main>
                </div>
                <aside
                    className={cn(
                        "hidden max-h-max space-y-4 divide-y divide-neutral-200 border border-neutral-300 bg-white p-3 pb-4 shadow-lg lg:col-span-1 lg:block lg:rounded-lg",
                        "dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900"
                    )}
                >
                    <div
                        aria-hidden
                        className="flex h-48 w-full flex-col items-center justify-center border-b border-neutral-400 text-neutral-400 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-400"
                    >
                        <SVGVideoPlayerIcon className="h-25 w-25" />
                        <p className="text-lg">Missing Video Thumbnail</p>
                    </div>
                    <CourseCTAButton
                        courseId={course?.id}
                        coursePrice={course?.price}
                        courseSalePrice={course?.sale_price}
                    />
                </aside>
            </div>
        </div>
    );
}
