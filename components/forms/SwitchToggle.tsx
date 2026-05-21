"use client";

import type { KeyboardEvent, ReactNode } from "react";
import { cn } from "~/lib/tw";

type SwitchToggleProps = {
    ariaLabel?: string;
    className?: string;
    checked: boolean;
    disabled: boolean;
    label: ReactNode;
    labelDescription?: ReactNode;
    onToggleChange(): void;
    name: string;
    title?: string;
};

export function SwitchToggle({
    ariaLabel,
    className,
    checked,
    disabled = false,
    name = "",
    onToggleChange,
    label,
    labelDescription = null,
    title
}: SwitchToggleProps) {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            onToggleChange();
        }
    };

    const id = `toggle-${name}`;

    return (
        <div className={cn("flex items-center space-x-2 rounded-lg", className)}>
            <div className="sr-only">
                <label htmlFor={id}>{label}</label>
                <input
                    aria-hidden
                    id={id}
                    data-testid={id}
                    tabIndex={-1}
                    checked={checked}
                    disabled={disabled}
                    readOnly
                />
            </div>
            {label}
            <button
                type="button"
                role="switch"
                title={title || "toggle option"}
                aria-label={ariaLabel || "toggle option"}
                aria-checked={checked}
                id={`${id}-button`}
                data-testid={`${id}-button`}
                name={name}
                disabled={disabled}
                onClick={onToggleChange}
                onKeyDown={handleKeyDown}
                className={cn(
                    "relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full bg-gray-100 transition-colors duration-200",
                    "dark:bg-neutral-600",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    "focus:ring-1 focus:ring-offset-1 focus:outline-none",
                    "border border-neutral-500",
                    checked ? "border-none bg-blue-500 dark:bg-blue-400" : "bg-neutral-400 dark:bg-neutral-900"
                )}
            >
                <div
                    className={cn(
                        "h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200",
                        checked ? "translate-x-6" : "translate-x-1"
                    )}
                />
            </button>
            {labelDescription}
        </div>
    );
}
