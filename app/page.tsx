import type { Metadata } from "next";
import { cacheLife, cacheTag } from "next/cache";
import CourseListItem from "~/components/CourseListItem";
import Main from "~/components/Main";
import { staticCaller } from "~/lib/trpc/server";

export const metadata: Metadata = {
    title: "Online Courses | Company",
    openGraph: {
        title: "Online Courses | Company"
    }
};

export default async function CoursesPage() {
    "use cache";

    cacheLife("minutes");
    cacheTag("/courses/");

    const data = await staticCaller.getCourses();

    return (
        <Main>
            <div className="grid w-full max-w-6xl gap-3 md:gap-8">
                <h1 data-testid="page-title" className="text-2xl font-bold md:text-4xl">
                    Courses
                </h1>
                {data?.length ? (
                    <ul className="grid grid-cols-1 items-center justify-center gap-y-6 sm:grid-cols-2 sm:gap-x-4 lg:grid-cols-3">
                        {data.map((course) => (
                            <CourseListItem key={course.id} course={course} />
                        ))}
                    </ul>
                ) : (
                    <div className="grid gap-y-4 rounded-lg border border-neutral-300 bg-white p-4 text-center md:p-8 dark:border-neutral-700 dark:bg-neutral-800">
                        <h2 className="text-xl md:text-2xl">We&apos;re unable to locate any courses.</h2>
                        <h3 className="md:text-lg">Great learning experiences take time to build. Check back soon!</h3>
                    </div>
                )}
            </div>
        </Main>
    );
}
