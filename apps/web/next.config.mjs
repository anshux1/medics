/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "prepmedics.blob.core.windows.net",
      },
    ],
  },
}

export default nextConfig
