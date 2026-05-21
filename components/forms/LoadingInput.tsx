import type { ReactNode } from "react";
import { cn } from "~/lib/tw";

type LoadingInputProps = {
    children?: ReactNode;
    className?: string;
    label: ReactNode;
};

export default function LoadingInput({ children, className, label }: LoadingInputProps) {
    return (
        <div className="space-y-0.5">
            <p className="block">{label}</p>
            <div
                className={cn(
                    "h-10.5 w-full animate-pulse rounded border border-transparent bg-neutral-200 dark:bg-neutral-500",
                    className
                )}
            />
            {children}
        </div>
    );
}
