import type { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
    return <div className="grid w-full max-w-6xl gap-3 md:gap-8">{children}</div>;
}
