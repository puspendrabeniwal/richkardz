/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["mern.richkardz.com"],
  },
  async rewrites() {
    return [
      {
        source: "/admin",
        destination: "/admin/signin",
      },
    ];
  },
};
module.exports = nextConfig;
