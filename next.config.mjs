/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["avatars.yandex.net", "basket-18.wbbasket.ru"],
    unoptimized: true,
  },
  reactStrictMode: false,
};

export default nextConfig;