export function getUrl() {
    const base =
        !global.window || typeof window !== "undefined"
            ? ""
            : process.env.VERCEL_URL
              ? `https://${process.env.VERCEL_URL}`
              : "http://localhost:3000";
    return `${base}/api/trpc/`;
}
