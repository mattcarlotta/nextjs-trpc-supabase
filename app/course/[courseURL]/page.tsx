import { CourseDetail } from "~/components/CourseDetail";
import { HydrateClient, prefetch, trpc } from "~/lib/trpc/server";

export default async function CourseDetailPage({ params }: PageProps<"/course/[courseURL]">) {
    const { courseURL } = await params;

    prefetch(trpc.getCourse.queryOptions({ url: courseURL }));

    return (
        <HydrateClient>
            <CourseDetail courseURL={courseURL} />
        </HydrateClient>
    );
}
