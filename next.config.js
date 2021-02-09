
module.exports = {
  images: {
    deviceSizes: [320, 500, 768, 1024, 1200, 1680, 2560],
    imageSizes: [60, 220],
    domains: [],
    path: "/_next/image",
    loader: "default",
  },
  env: {
    NEWS_API_KEY: process.env.NEWS_API_KEY,
    WEATHER_API_KEY: process.env.WEATHER_API_KEY
  },
  reactStrictMode: true,
  typescript: { ignoreDevErrors: true },
  poweredByHeader: false,
};