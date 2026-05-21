import CourseEditor from "~/components/CourseEditorForm";
import { HydrateClient, prefetch, trpc } from "~/lib/trpc/server";

export default async function CourseDetailPage({ params }: PageProps<"/course/[courseURL]">) {
    const { courseURL } = await params;

    prefetch(trpc.getCourse.queryOptions({ url: courseURL }));

    return (
        <HydrateClient>
            <CourseEditor courseURL={courseURL} />
        </HydrateClient>
    );
}
