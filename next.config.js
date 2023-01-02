/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "img.icons8.com",
      "i.stack.imgur.com",
      "pbs.twimg.com",
      "firebasestorage.googleapis.com",
    ],
  },
};

module.exports = nextConfig;
