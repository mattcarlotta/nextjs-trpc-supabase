"use client";

import type { SubmitHandler } from "react-hook-form";
import type { SignInSchema } from "~/lib/zod/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import Input from "~/components/forms/Input";
import { PasswordInput } from "~/components/forms/PasswordInput";
import useSession from "~/hooks/useSession";
import { cn } from "~/lib/tw";
import { signinSchema } from "~/lib/zod/auth";

export default function SignInForm() {
    const { signIn, isSigningIn } = useSession();

    const methods = useForm<SignInSchema>({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit: SubmitHandler<SignInSchema> = (data) => {
        signIn(data);
    };

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="grid gap-y-4 rounded-lg border border-neutral-300 bg-white px-6 pt-6 pb-10 drop-shadow-xl/30 dark:border-neutral-600 dark:bg-neutral-900"
            >
                <div className="space-y-1">
                    <h1 className="text-4xl font-bold md:mb-5 md:text-center">Sign in</h1>
                    <div className="flex items-center space-x-1 text-xs">
                        <sub className="flex w-3 shrink-0 items-center justify-center text-[1.25rem]">*</sub>
                        <p>Field is required</p>
                    </div>
                </div>
                <Input autoComplete="email" label="Email*" name="email" type="email" disabled={isSigningIn} />
                <PasswordInput />
                <button
                    type="submit"
                    className={cn(
                        "mt-2 flex w-full cursor-pointer items-center justify-center rounded-lg p-3 text-xl font-bold text-white transition-colors",
                        "border border-blue-700 bg-blue-500 hover:bg-blue-600",
                        "dark:border-blue-500 dark:bg-blue-600 dark:hover:border-blue-500 dark:hover:bg-blue-700",
                        "disabled:pointer-events-none disabled:border-transparent disabled:bg-neutral-500 disabled:text-neutral-200",
                        "dark:border-transparent dark:disabled:bg-neutral-800 dark:disabled:text-neutral-500"
                    )}
                    disabled={isSigningIn}
                >
                    {isSigningIn ? "Signing In..." : "Sign In"}
                </button>
            </form>
        </FormProvider>
    );
}
