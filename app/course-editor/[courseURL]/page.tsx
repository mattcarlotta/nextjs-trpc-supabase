import type { Metadata } from "next";
import CourseEditor from "~/components/CourseEditorForm";
import { HydrateClient, prefetch, trpc } from "~/lib/trpc/server";

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
