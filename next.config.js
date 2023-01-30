/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    MONGODB_URI: "mongodb://127.0.0.1/taskCrudApp",
  },
};

module.exports = nextConfig;
