import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Arimo } from "next/font/google";
import { description, inStaging, productionRobotsMeta, stagingRobotsMeta } from "~/lib/contants";
import { TRPCReactProvider } from "~/lib/trpc/client";
import { cn } from "~/lib/tw";
import "./globals.css";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#171717" }
    ]
};

export const metadata: Metadata = {
    metadataBase: new URL("http://locahost:3000/"),
    title: { default: "Company", template: `%s | Company` },
    description,
    alternates: {
        canonical: "./"
    },
    // icons: {
    //     icon: [
    //         { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    //         { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    //     ],
    //     apple: "/apple-touch-icon.png"
    // },
    // manifest: "/manifest.json",
    openGraph: {
        title: { default: "Company", template: `%s | Company` },
        description,
        url: "/",
        siteName: "Example",
        locale: "en_US",
        type: "website"
    },
    robots: inStaging ? stagingRobotsMeta : productionRobotsMeta
};

const arimo = Arimo({
    variable: "--font-arimo",
    subsets: ["latin"]
});

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="en" className={cn(arimo.variable, "h-full antialiased")}>
            <body>
                <TRPCReactProvider>{children}</TRPCReactProvider>
            </body>
        </html>
    );
}
