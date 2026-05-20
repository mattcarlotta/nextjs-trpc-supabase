import { cn } from "~/lib/tw";

export function PostsSkeleton() {
    return (
        <>
            {[1, 2, 3].map((index) => (
                <div
                    key={index}
                    className={cn(
                        "h-12 w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-600",
                        index === 2 && "bg-neutral-300 dark:bg-neutral-700",
                        index === 3 && "bg-neutral-400 dark:bg-neutral-800"
                    )}
                />
            ))}
        </>
    );
}
