/** @type {import('next').NextConfig} */
const nextConfig = {
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
