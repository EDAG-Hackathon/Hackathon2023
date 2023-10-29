/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["echarts", "zrender"],
  async redirects() {
    return [
      {
        source: "/",
        destination: "/organisations",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
