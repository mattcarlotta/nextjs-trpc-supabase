"use client";

import useSession from "~/hooks/useSession";
import { cn } from "~/lib/tw";

type SignOutButtonProps = {
    className: string;
    role?: string;
};

export default function SignOutButton({ className, role }: SignOutButtonProps) {
    const { signOut, isSigningOut } = useSession();

    const handleClick = () => {
        signOut();
    };

    return (
        <button
            type="button"
            role={role}
            disabled={isSigningOut}
            onClick={handleClick}
            className={cn(
                "flex cursor-pointer items-center justify-center space-x-1 rounded-lg bg-red-600 p-2 font-semibold text-white hover:bg-red-500",
                "disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:hover:bg-neutral-400 dark:disabled:bg-neutral-500 dark:disabled:hover:bg-neutral-500",
                className
            )}
        >
            {isSigningOut ? "Signing Out..." : "Sign Out"}
        </button>
    );
}
