import type { ReactNode } from "react";
import { connection } from "next/server";
import { HydrateClient, prefetch, trpc } from "~/lib/trpc/server";

export default async function SessionPrefetch({ children }: { children: ReactNode }) {
    await connection();

    prefetch(trpc.getSession.queryOptions());

    return <HydrateClient>{children}</HydrateClient>;
}
