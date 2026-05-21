import { ReactNode } from "react";
import { cn } from "~/lib/tw";

export default function Main({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <main
            id="content"
            className={cn("flex w-full flex-col items-center justify-center px-6 pt-6 pb-10", className)}
        >
            {children}
        </main>
    );
}
