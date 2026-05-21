import { ReactNode } from "react";

export default function Main({ children }: { children: ReactNode }) {
    return (
        <main id="content" className="flex w-full flex-col items-center justify-center px-6 pt-6 pb-10">
            {children}
        </main>
    );
}
