"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import Container from "~/components/Container";
import CoursesTitle from "~/components/CoursesTitle";
import Main from "~/components/Main";
import SVGVideoPlayerIcon from "~/icons/SVGVideoPlayerIcon";
import { toUSDCurrency } from "~/lib/currency";
import { useTRPC } from "~/lib/trpc/client";
import { cn } from "~/lib/tw";
import { toCustomLocaleString } from "~/utils/date";

export default function Page() {
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery(trpc.courses.queryOptions());

    if (isLoading) {
        return (
            <Main>
                <Container>
                    <CoursesTitle />
                    <ul className="grid grid-cols-1 items-center justify-center gap-y-6 sm:grid-cols-2 sm:gap-x-4 lg:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map((index) => (
                            <li
                                key={index}
                                className="h-100 animate-pulse rounded bg-neutral-300 dark:bg-neutral-600"
                            />
                        ))}
                    </ul>
                </Container>
            </Main>
        );
    }

    if (!data?.length) {
        return (
            <Main>
                <Container>
                    <CoursesTitle />
                    <div className="grid gap-y-4 rounded-lg border border-neutral-600 bg-white p-4 text-center md:p-8 dark:border-neutral-700 dark:bg-neutral-800">
                        <h2 className="text-xl md:text-2xl">We&apos;re unable to locate any courses.</h2>
                        <h3 className="md:text-lg">Great learning experiences take time to build. Check back soon!</h3>
                    </div>
                </Container>
            </Main>
        );
    }

    return (
        <Main>
            <Container>
                <CoursesTitle />
                <ul className="grid grid-cols-1 items-center justify-center gap-y-6 sm:grid-cols-2 sm:gap-x-4 lg:grid-cols-3">
                    {data.map((course) => (
                        <li
                            key={course.id}
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
                                    onMouseEnter={() =>
                                        queryClient.prefetchQuery(trpc.getCourse.queryOptions({ url: course.url }))
                                    }
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
                                            <h2 className="line-clamp-1 font-bold md:text-lg md:leading-7">
                                                {course.title}
                                            </h2>
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
                    ))}
                </ul>
            </Container>
        </Main>
    );
}
