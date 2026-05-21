import { ReactNode } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import SVGErrorIcon from "~/icons/SVGErrorIcon";
import { cn } from "~/lib/tw";

export type FormErrorProps = {
    children?: ReactNode;
    className?: string;
    error?: FieldError | Merge<FieldError, FieldErrorsImpl> | Error | string;
    id?: string;
};

export default function FormError({ children, className, error, id }: FormErrorProps) {
    if (!error) {
        return null;
    }

    const errorMessage = typeof error !== "string" ? String(error?.message) : error;

    return (
        <div
            id={id}
            role="alert"
            aria-live="polite"
            className={cn("flex-1 text-sm text-red-700 dark:text-red-600", className)}
        >
            {children || errorMessage}
            {Boolean(error && !errorMessage) && (
                <div className="flex items-center space-x-1">
                    <SVGErrorIcon className="w-4" />
                    <span>Required</span>
                </div>
            )}
        </div>
    );
}
