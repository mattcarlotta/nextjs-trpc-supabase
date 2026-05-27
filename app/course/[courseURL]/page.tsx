import type { Metadata } from "next";
import { cacheLife, cacheTag } from "next/cache";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "~/lib/supabase/server";
import { staticCaller } from "~/lib/trpc/server";
import { active_published_statuses } from "~/lib/zod/courses";
import CourseDetail from "./CourseDetail";

export async function generateStaticParams() {
    const { data } = await supabaseAdmin.from("courses").select("url").in("status", active_published_statuses);

    if (!data?.length) {
        return [];
    }

    return data.map(({ url }) => ({
        courseURL: url
    }));
}

type Props = {
    params: Promise<{ courseURL: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    "use cache";

    const { courseURL } = await params;
    cacheLife("minutes");
    cacheTag(`/course/${courseURL}/`);

    const { data } = await supabaseAdmin
        .from("courses")
        .select("title, description, created_at, published_at, updated_at, author:author_id(first_name, last_name)")
        .eq("url", courseURL)
        .single();

    if (!data) {
        return {};
    }

    const title = `${data.title} by ${data.author.first_name} ${data.author.last_name}`.trim().replace(/[\r\n]+/g, "");

    const description = String(data.description)
        .trim()
        .replace(/[\r\n]+/g, "");

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "article",
            publishedTime: new Date(data.created_at).toISOString(),
            modifiedTime: data.updated_at ? new Date(data.updated_at).toISOString() : "",
            authors: `${data.author.first_name} ${data.author.last_name}`
        }
    };
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
