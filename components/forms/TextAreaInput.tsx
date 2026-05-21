"use client";

import type { FieldValues } from "react-hook-form";
import type { TextAreaProps } from "./Input";
import { useFormContext } from "react-hook-form";
import { cn } from "~/lib/tw";
import FormError from "./FormError";

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
    const {
        register,
        watch,
        formState: { errors }
    } = useFormContext();

    const value = watch(name);

    return (
        <div className={cn("space-y-0.5", containerClassName)}>
            <label className={cn("flex items-center space-x-1", labelClassName)} htmlFor={name}>
                {label}
            </label>
            {fieldDescription}
            <textarea
                id={name}
                data-testid={name}
                placeholder={placeholder}
                disabled={disabled}
                cols={cols || 1}
                rows={rows || 1}
                maxLength={maxLength}
                className={cn(
                    "hide-scrollbar w-full rounded border bg-gray-50 p-2 dark:bg-neutral-900",
                    "disabled:bg-gray-200 disabled:text-gray-400",
                    "dark:disabled:border-gray-800 dark:disabled:bg-transparent dark:disabled:text-gray-600",
                    className,
                    hasError || errors[name]
                        ? "border-red-700 dark:border-red-600"
                        : "border-nuetral-400 dark:border-neutral-500"
                )}
                {...register(name, { required })}
            />
            {children}
            {Boolean(showErrors || showCharactersLeft) && (
                <div className="flex space-x-1">
                    {showErrors && <FormError error={errors[name]} />}
                    {Boolean(showCharactersLeft && maxLength) && (
                        <p className="text-right text-sm">
                            {value?.length?.toLocaleString()}/{maxLength?.toLocaleString()} characters
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
