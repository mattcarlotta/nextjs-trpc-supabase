import BackToCoursesLink from "~/components/BackToCoursesLink";
import Main from "~/components/Main";
import { cn } from "~/lib/tw";

export default function CourseNotFound({ error }: { error: string }) {
    return (
        <div className="flex min-h-[calc(100vh-100px)] items-center justify-center p-4">
            <div
                className={cn(
                    "w-full max-w-124 divide-y divide-neutral-200 rounded-xl border border-neutral-300 bg-white shadow-lg",
                    "dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900"
                )}
            >
                <Main className="space-y-4">
                    <BackToCoursesLink />
                    <div className="space-y-4">
                        <h1 className="text-3xl font-semibold">Oops! Something went wrong.</h1>
                        <p className="font-medium text-red-500">{error}</p>
                    </div>
                </Main>
            </div>
        </div>
    );
}
