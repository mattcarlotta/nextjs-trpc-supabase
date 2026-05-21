import type { Metadata } from "next";
import { cacheLife, cacheTag } from "next/cache";
import Container from "~/components/Container";
import CourseListItem from "~/components/CourseListItem";
import CoursesTitle from "~/components/CoursesTitle";
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

    const data = await staticCaller.courses();

    return (
        <Main>
            <Container>
                <CoursesTitle />
                {data?.length ? (
                    <ul className="grid grid-cols-1 items-center justify-center gap-y-6 sm:grid-cols-2 sm:gap-x-4 lg:grid-cols-3">
                        {data.map((course) => (
                            <CourseListItem key={course.id} course={course} />
                        ))}
                    </ul>
                ) : (
                    <div className="grid gap-y-4 rounded-lg border border-neutral-600 bg-white p-4 text-center md:p-8 dark:border-neutral-700 dark:bg-neutral-800">
                        <h2 className="text-xl md:text-2xl">We&apos;re unable to locate any courses.</h2>
                        <h3 className="md:text-lg">Great learning experiences take time to build. Check back soon!</h3>
                    </div>
                )}
            </Container>
        </Main>
    );
}
