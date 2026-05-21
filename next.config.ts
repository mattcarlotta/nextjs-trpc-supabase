import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: ["127.0.0.1", "localhost"],
    devIndicators: false,
    experimental: {
        turbopackFileSystemCacheForDev: true
    },
    trailingSlash: true,
    poweredByHeader: false,
    images: {
        minimumCacheTTL: 2678400,
        qualities: [60, 75, 100],
        remotePatterns: [
            {
                protocol: "http",
                hostname: "127.0.0.1",
                port: "54321",
                pathname: "/**"
            }
        ]
    }
};

export default nextConfig;
