"use client";

import type { HTMLInputAutoCompleteAttribute, ReactNode } from "react";
import type { FieldError, FieldValues, Path, ValidationRule } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import { cn } from "~/lib/tw";
import FormError from "./FormError";

export interface InputProps<T extends FieldValues> {
    accept?: string;
    ariaHidden?: boolean;
    autoComplete?: HTMLInputAutoCompleteAttribute;
    autoGenerateFromField?: Path<T>;
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
    const {
        watch,
        register,
        formState: { errors }
    } = useFormContext();

    const value = watch(name);

    return (
        <div className={cn("space-y-0.5", containerClassName)}>
            <label className={cn("block", labelClassName)} htmlFor={name}>
                <span>{label}</span>
            </label>
            {fieldDescription}
            <input
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
                className={cn(
                    "w-full rounded border bg-gray-50 p-2 dark:bg-neutral-900",
                    "disabled:bg-gray-200 disabled:text-gray-400",
                    "dark:disabled:border-gray-800 dark:disabled:bg-transparent dark:disabled:text-gray-600",
                    className,
                    hasError || errors[name]
                        ? "border-red-700 dark:border-red-600"
                        : "border-nuetral-400 dark:border-neutral-500"
                )}
                {...register(name, {
                    required: required as ValidationRule<boolean>,
                    setValueAs: (value) => {
                        if (type !== "number") return value;

                        if (value === "" || value === null || value === undefined || Number.isNaN(Number(value))) {
                            return null;
                        }

                        return Number(value);
                    }
                })}
            />
            {children}
            {Boolean(showErrors || showCharactersLeft) && (
                <div className="flex space-x-1">
                    {showErrors && <FormError error={errors[name]} />}
                    {Boolean(showCharactersLeft && (max || maxLength)) && (
                        <p className="text-right text-sm">
                            {value?.length?.toLocaleString()}/{(max || maxLength)?.toLocaleString()} characters
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
