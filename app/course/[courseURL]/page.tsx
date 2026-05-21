import { cacheLife, cacheTag } from "next/cache";
import { notFound } from "next/navigation";
import { CourseDetail } from "~/components/CourseDetail";
import { supabaseAdmin } from "~/lib/supabase/server";
import { staticCaller } from "~/lib/trpc/server";
import { active_published_statuses } from "~/lib/zod/courses";

export async function generateStaticParams() {
    const { data } = await supabaseAdmin.from("courses").select("url").in("status", active_published_statuses);

    if (!data?.length) {
        return [];
    }

    return data.map(({ url }) => ({
        courseURL: url
    }));
}

export default async function CourseDetailPage({ params }: PageProps<"/course/[courseURL]">) {
    "use cache";
    cacheLife("minutes");

    const { courseURL } = await params;
    cacheTag(`/course/${courseURL}/`);

    const { course } = await staticCaller.getCourse({ url: courseURL });

    if (!course) {
        notFound();
    }

    return <CourseDetail course={course} />;
}
