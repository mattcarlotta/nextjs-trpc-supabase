import { cn } from "~/lib/tw";
import LoadingInput from "./forms/LoadingInput";

export default function CourseEditorSkeleton() {
    return (
        <main className="flex items-center justify-center md:mt-10 md:pb-20">
            <div
                className={cn(
                    "w-full max-w-220 divide-y divide-neutral-200 border border-neutral-300 bg-white shadow-lg md:rounded-xl",
                    "dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900"
                )}
            >
                <div className="space-y-4 p-5 pb-10 tracking-wider">
                    <div
                        className={cn(
                            "group inline-flex max-w-max items-center gap-1 self-start text-sm text-neutral-500 transition-colors",
                            "hover:text-blue-600",
                            "focus-visible:text-blue-600 focus-visible:outline-none",
                            "dark:text-neutral-400 dark:hover:text-blue-400 dark:focus-visible:text-blue-400"
                        )}
                    >
                        <p className="transition-transform group-hover:-translate-x-1" aria-hidden>
                            ←
                        </p>
                        <p>Go back to course</p>
                    </div>
                    <div className="grid gap-y-4 md:px-4">
                        <div className="space-y-1">
                            <header>
                                <h1 data-testid="page-title" className="text-2xl font-bold lg:text-4xl">
                                    Course Editor
                                </h1>
                            </header>
                            <div className="flex items-center space-x-1 text-xs">
                                <sub className="flex w-3 shrink-0 items-center justify-center text-[1.25rem]">*</sub>
                                <p>Field is required</p>
                            </div>
                        </div>
                        <LoadingInput label="Course Title*">
                            <p className="text-sm">-/256 Characters</p>
                        </LoadingInput>
                        <LoadingInput className="h-52.5" label="Course Description*">
                            <p className="mt-2 text-sm">-/1000 Characters</p>
                        </LoadingInput>
                        <LoadingInput label="Course Price*" />
                        <div className="h-8.5 w-50 animate-pulse rounded bg-neutral-200 dark:bg-neutral-500" />
                        <div className="h-13.5 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-500" />
                    </div>
                </div>
            </div>
        </main>
    );
}
