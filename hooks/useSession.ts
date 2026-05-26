"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTRPC } from "~/lib/trpc/client";

export default function useSession() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const trpc = useTRPC();

    const { data: session, isLoading: isLoadingSession } = useQuery(trpc.getSession.queryOptions());

    const { mutate: signIn, isPending: isSigningIn } = useMutation(
        trpc.signIn.mutationOptions({
            onSuccess: (newSession) => {
                queryClient.setQueryData(trpc.getSession.queryKey(), newSession);

                router.push("/");
            },
            onError: (error) => {
                alert(error.message);
            }
        })
    );

    const { mutate: signOut, isPending: isSigningOut } = useMutation(
        trpc.signOut.mutationOptions({
            onSuccess: () => {
                queryClient.setQueryData(trpc.getSession.queryKey(), null);
                queryClient.removeQueries();

                router.replace("/sign-in/");
            },
            onError: (error) => {
                alert(error.message);
            }
        })
    );

    return {
        session,
        isLoadingSession,

        signIn,
        isSigningIn,

        signOut,
        isSigningOut
    };
}
