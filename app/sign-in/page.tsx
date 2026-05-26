import type { Metadata } from "next";
import Main from "~/components/Main";
import SignInForm from "./SignInForm";

export const metadata: Metadata = {
    title: "Sign In",
    openGraph: {
        title: "Sign In",
        siteName: "Sign into your account and continue building your future."
    }
};

export default function SignInPage() {
    return (
        <Main className="min-h-[calc(100vh-100px)]">
            <div className="w-full max-w-md">
                <SignInForm />
            </div>
        </Main>
    );
}
