import Link from "next/link";
import { useState } from "react";
import { FieldValues, Path } from "react-hook-form";
import SVGHideIcon from "~/icons/SVGHideIcon";
import SVGShowIcon from "~/icons/SVGShowIcon";
import Input from "./Input";

type PasswordInputProps = {
    showForgotPasswordLink?: boolean;
};

export function PasswordInput<T extends FieldValues>({ showForgotPasswordLink = true }: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const name = "password" as Path<T>;

    const handleShowPassword = () => {
        setShowPassword((p) => !p);
    };

    return (
        <Input
            label={
                <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-1" htmlFor="password">
                        <span>Password*</span>
                        <button
                            aria-label={`${showPassword ? "Show" : "Hide"} password`}
                            aria-pressed={showPassword ? "true" : "false"}
                            type="button"
                            onClick={handleShowPassword}
                            className="cursor-pointer"
                        >
                            {showPassword ? <SVGHideIcon className="h-6 w-6" /> : <SVGShowIcon className="h-6 w-6" />}
                        </button>
                    </label>
                    {showForgotPasswordLink && (
                        <Link
                            className="text-xs font-semibold text-blue-500 hover:underline dark:text-blue-400"
                            href="/forgot-password/"
                            prefetch={false}
                        >
                            Forgot Password?
                        </Link>
                    )}
                </div>
            }
            name={name}
            type={showPassword ? "text" : "password"}
        />
    );
}
