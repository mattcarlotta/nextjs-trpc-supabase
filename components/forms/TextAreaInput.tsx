"use client";

import type { ReactNode } from "react";
import type { FieldValues, Path } from "react-hook-form";
import { useController, useFormContext } from "react-hook-form";
import { cn } from "~/lib/tw";
import FormError from "./FormError";

export interface TextAreaProps<T extends FieldValues> {
    className?: string;
    children?: ReactNode;
    cols?: number;
    containerClassName?: string;
    disabled?: boolean;
    fieldDescription?: ReactNode;
    hasError?: boolean;
    hideFullScreen?: boolean;
    label?: ReactNode;
    labelClassName?: string;
    maxLength?: number;
    name: Path<T>;
    placeholder?: string;
    required?: boolean;
    rows?: number;
    showCharactersLeft?: boolean;
    showErrors?: boolean;
}

export function TextAreaInput<T extends FieldValues>({
    cols,
    children,
    className,
    containerClassName,
    disabled,
    hasError,
    fieldDescription = null,
    label = null,
    labelClassName,
    maxLength,
    name,
    placeholder,
    required,
    rows,
    showErrors = true,
    showCharactersLeft
}: TextAreaProps<T>) {
    const { control } = useFormContext<T>();

    const {
        field,
        fieldState: { error }
    } = useController<T>({
        name,
        control,
        rules: { required }
    });

    return (
        <div className={cn("space-y-0.5", containerClassName)}>
            <label className={cn("flex items-center space-x-1", labelClassName)} htmlFor={name}>
                {label}
            </label>
            {fieldDescription}
            <textarea
                {...field}
                id={name}
                data-testid={name}
                placeholder={placeholder}
                disabled={disabled}
                cols={cols || 1}
                rows={rows || 1}
                maxLength={maxLength}
                value={field.value ?? ""}
                className={cn(
                    "hide-scrollbar w-full rounded border bg-gray-50 p-2 dark:bg-neutral-900",
                    "disabled:bg-gray-200 disabled:text-gray-400",
                    "dark:disabled:border-gray-800 dark:disabled:bg-transparent dark:disabled:text-gray-600",
                    className,
                    hasError || error
                        ? "border-red-700 dark:border-red-600"
                        : "border-neutral-400 dark:border-neutral-500"
                )}
            />
            {children}
            {Boolean(showErrors || showCharactersLeft) && (
                <div className="flex space-x-1">
                    {showErrors && <FormError error={error} />}
                    {Boolean(showCharactersLeft && maxLength) && (
                        <p className="text-right text-sm">
                            {String(field.value ?? "").length.toLocaleString()}/{maxLength?.toLocaleString()} characters
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
