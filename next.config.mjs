/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async rewrites() {
    const apiUrl =
      process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || "http://localhost:8080";
    return [
      {
        source: "/api/:path*",
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
  images: {
    domains: ["localhost"],
  },
};

export default nextConfig;
