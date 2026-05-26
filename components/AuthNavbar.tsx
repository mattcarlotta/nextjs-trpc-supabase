"use client";

import type { FocusEvent, KeyboardEvent } from "react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import useSession from "~/hooks/useSession";
import { cn } from "~/lib/tw";
import SignOutButton from "./SignoutButton";

function AvatarButton() {
    const { session } = useSession();
    const menuRef = useRef<HTMLDivElement | null>(null);
    const [isMenuOpen, setMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setMenuOpen((p) => !p);
    };

    const handleClickOutside = useCallback(
        (e: MouseEvent) => {
            if (isMenuOpen && !menuRef.current?.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        },
        [isMenuOpen, setMenuOpen]
    );

    const handleFocusOut = (e: FocusEvent<HTMLElement>) => {
        if (isMenuOpen && !menuRef.current?.contains((e.relatedTarget as Node) || (e.currentTarget as Node))) {
            setMenuOpen(false);
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (isMenuOpen && e.key === "Escape") {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        const ab = new AbortController();

        document.addEventListener("mousedown", handleClickOutside, { signal: ab.signal });

        return () => {
            ab.abort();
        };
    }, [handleClickOutside]);

    return (
        <div
            ref={menuRef}
            onBlur={handleFocusOut}
            onKeyDown={handleKeyDown}
            className="group relative flex w-14 rounded"
        >
            <button
                type="button"
                data-testid="nav-account-button"
                aria-haspopup="true"
                aria-expanded={isMenuOpen}
                aria-controls="profile-menu-options"
                aria-label="User menu"
                className={cn(
                    "flex cursor-pointer items-center justify-center rounded-full p-2",
                    "focus-within:bg-neutral-300 hover:bg-neutral-300",
                    "dark:focus-within:bg-neutral-600 dark:hover:bg-neutral-600"
                )}
                onClick={handleMenuToggle}
            >
                <p
                    className={cn(
                        "flex h-40 w-40 items-center justify-center rounded-full bg-blue-500 text-6xl text-white uppercase dark:bg-blue-600",
                        "h-10 w-10 border border-white text-sm dark:border-blue-500"
                    )}
                >
                    {session?.first_name?.charAt(0)}
                    {session?.last_name?.charAt(0)}
                </p>
            </button>
            <div className={cn("absolute top-full right-0 w-50", isMenuOpen ? "absolute z-10" : "hidden")}>
                <div className="relative">
                    <div
                        role="menu"
                        data-testid="nav-menu"
                        id="profile-menu-options"
                        aria-label="Profile and account options"
                        className={cn(
                            "hide-scrollbar mt-1 grid max-h-[calc(100vh-100px)] gap-y-4 overflow-y-auto rounded border border-white bg-white p-3 drop-shadow-xl/30",
                            "dark:border-neutral-600 dark:bg-neutral-900"
                        )}
                    >
                        <div className="flex flex-col space-y-3">
                            <Link
                                data-testid="nav-menu-profile"
                                role="menuitem"
                                className={cn(
                                    "flex h-full flex-1 items-center space-x-2.5 rounded-lg py-2 pl-2.5",
                                    "hover:bg-neutral-300 focus:bg-neutral-300",
                                    "dark:hover:bg-neutral-600 dark:focus:bg-neutral-500"
                                )}
                                href="/account/profile/"
                                prefetch={false}
                            >
                                <p className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-400 text-xl text-white uppercase dark:bg-blue-600">
                                    {session?.first_name?.charAt(0)}
                                    {session?.last_name?.charAt(0)}
                                </p>
                                <div className="flex flex-1 flex-col">
                                    <p className="line-clamp-1">
                                        {session?.first_name} {session?.last_name}
                                    </p>
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400">View Profile</p>
                                </div>
                            </Link>
                            <SignOutButton className="p-2 text-xs" role="menuitem" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AuthNavbar() {
    const { session, isSigningIn } = useSession();

    if (isSigningIn || !session) {
        return (
            <Link
                className={cn(
                    "cursor-pointer rounded-lg bg-blue-500 p-2 text-white transition-colors",
                    "hover:border-white hover:bg-blue-600 hover:text-white",
                    "dark:border-blue-500 dark:bg-blue-600 dark:hover:border-blue-500 dark:hover:bg-blue-700"
                )}
                href="/sign-in/"
                prefetch={false}
            >
                Sign In
            </Link>
        );
    }

    return <AvatarButton />;
}
