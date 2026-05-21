import { cn } from "~/lib/tw";
import BackToCoursesLink from "./BackToCoursesLink";
import Main from "./Main";

export function CourseNotFound({ error }: { error: string }) {
    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div
                className={cn(
                    "w-full max-w-120 divide-y divide-neutral-200 rounded-xl border border-neutral-300 bg-white shadow-lg",
                    "dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900"
                )}
            >
                <Main>
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
