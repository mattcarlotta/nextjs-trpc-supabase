import type { FetchInfiniteQueryOptions, FetchQueryOptions } from "@tanstack/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { headers } from "next/headers";
import { cache } from "react";
import "server-only";
import { createTRPCContext } from "./init";
import { getQueryClient } from "./queryClient";
import { appRouter } from "./router";

export const getServerQueryClient = cache(getQueryClient);

export const trpc = createTRPCOptionsProxy({
    ctx: async () => createTRPCContext({ headers: await headers() }),
    router: appRouter,
    queryClient: getServerQueryClient
});

export function HydrateClient({ children }: { children: React.ReactNode }) {
    const queryClient = getServerQueryClient();
    return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}

export function prefetch<TData, TError, TQueryKey extends readonly unknown[]>(
    queryOptions: FetchQueryOptions<TData, TError, TData, TQueryKey>
) {
    const queryClient = getServerQueryClient();
    void queryClient.prefetchQuery(queryOptions);
}

export function prefetchInfinite<TQueryFnData, TError, TData, TQueryKey extends readonly unknown[], TPageParam>(
    queryOptions: FetchInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryKey, TPageParam>
) {
    const queryClient = getServerQueryClient();
    void queryClient.prefetchInfiniteQuery(queryOptions);
}

export const caller = appRouter.createCaller(async () => createTRPCContext({ headers: await headers() }));
export const staticCaller = appRouter.createCaller(() => createTRPCContext({ headers: new Headers() }));
