"use client";

import type { HTMLInputAutoCompleteAttribute, ReactNode } from "react";
import type { FieldError, FieldValues, Path } from "react-hook-form";
import { useController, useFormContext } from "react-hook-form";
import { cn } from "~/lib/tw";
import FormError from "./FormError";

export interface InputProps<T extends FieldValues> {
    accept?: string;
    ariaHidden?: boolean;
    autoComplete?: HTMLInputAutoCompleteAttribute;
    className?: string;
    containerClassName?: string;
    disabled?: boolean;
    hasError?: boolean;
    error?: FieldError | string;
    fieldClassName?: string;
    fieldDescription?: ReactNode;
    label: ReactNode;
    labelClassName?: string;
    initialValue?: string;
    max?: number;
    maxLength?: number;
    min?: number;
    minLength?: number;
    name: Path<T>;
    pattern?: string;
    preview?: string | null;
    required?: boolean;
    spellCheck?: boolean;
    step?: string;
    type?: string;
    placeholder?: string;
    children?: ReactNode;
    showCharactersLeft?: boolean;
    showErrors?: boolean;
}

export default function Input<T extends FieldValues>({
    autoComplete,
    ariaHidden,
    children,
    className,
    containerClassName,
    disabled,
    fieldDescription = null,
    labelClassName,
    hasError,
    label,
    max,
    maxLength,
    min,
    minLength,
    name,
    pattern,
    placeholder,
    required = true,
    step,
    showCharactersLeft = false,
    showErrors = true,
    spellCheck,
    type = "text"
}: InputProps<T>) {
    const { control } = useFormContext<T>();

    const {
        field,
        fieldState: { error }
    } = useController<T>({
        name,
        control,
        rules: {
            required
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        if (type === "number") {
            if (value === "" || value === null || Number.isNaN(Number(value))) {
                field.onChange(null);
                return;
            }

            field.onChange(Number(value));
            return;
        }

        field.onChange(value);
    };

    const displayError = error ?? (hasError ? { message: "" } : undefined);

    return (
        <div className={cn("space-y-0.5", containerClassName)}>
            <label className={cn("block", labelClassName)} htmlFor={name}>
                <span>{label}</span>
            </label>
            {fieldDescription}
            <input
                {...field}
                aria-hidden={ariaHidden}
                id={name}
                data-testid={name}
                disabled={disabled}
                type={type}
                placeholder={placeholder}
                min={min}
                max={max}
                minLength={minLength}
                maxLength={maxLength}
                pattern={pattern}
                step={step}
                autoComplete={autoComplete}
                spellCheck={spellCheck}
                onChange={handleChange}
                value={field.value ?? ""}
                className={cn(
                    "w-full rounded border bg-gray-50 p-2 dark:bg-neutral-900",
                    "disabled:bg-gray-200 disabled:text-gray-400",
                    "dark:disabled:border-gray-800 dark:disabled:bg-transparent dark:disabled:text-gray-600",
                    className,
                    displayError ? "border-red-700 dark:border-red-600" : "border-neutral-400 dark:border-neutral-500"
                )}
            />
            {children}
            {Boolean(showErrors || showCharactersLeft) && (
                <div className="flex space-x-1">
                    {showErrors && <FormError error={error} />}
                    {Boolean(showCharactersLeft && (max || maxLength)) && (
                        <p className="text-right text-sm">
                            {String(field.value ?? "").length.toLocaleString()}/{(max || maxLength)?.toLocaleString()}{" "}
                            characters
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
