// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/flights/:path*",
        destination: "https://travel.paytm.com/api/a/flights/v1/:path*",
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
