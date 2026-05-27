import type { Metadata } from "next";
import { HydrateClient, prefetch, trpc } from "~/lib/trpc/server";
import CourseEditor from "./CourseEditorForm";

export const metadata: Metadata = {
    title: "Course Editor",
    openGraph: {
        title: "Course Editor"
    }
};

export default async function CourseDetailPage({ params }: PageProps<"/course/[courseURL]">) {
    const { courseURL } = await params;

    prefetch(trpc.getCourseDetailsForEditing.queryOptions({ url: courseURL }));

    return (
        <HydrateClient>
            <CourseEditor courseURL={courseURL} />
        </HydrateClient>
    );
}
