import { cn } from "~/lib/tw";
import BackToCoursesLink from "./BackToCoursesLink";
import Main from "./Main";

export function CourseSkeleton() {
    return (
        <div className="flex items-center justify-center pt-20">
            <div
                className={cn(
                    "w-full max-w-220 divide-y divide-neutral-200 rounded-xl border border-neutral-300 bg-white shadow-lg",
                    "dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900"
                )}
            >
                <Main>
                    <BackToCoursesLink />
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <div className="h-12 w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-500" />
                            <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-2">
                                <p>Share</p>
                                <p>QR Code</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="h-10 w-10 animate-pulse items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-500" />
                            <div className="flex-1 space-y-0.5">
                                <div className="h-6 w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-500" />
                                <div className="h-3.75 w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-500" />
                            </div>
                        </div>
                        <div className="h-100 animate-pulse rounded bg-neutral-200 dark:bg-neutral-500" />
                    </div>
                </Main>
            </div>
        </div>
    );
}
