/** @type {import('next').NextConfig} */
// const withMDX = require('@next/mdx')()

const nextConfig = {

  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development", // Remove console.log in production
  },
  experimental: {
    appDir: true

  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: "/static",
  },

  cleanDistDir: true,
  output: "standalone",
  poweredByHeader: false,
  trailingSlash: false,
  // headers: { 'developed-by': 'ali tek' },
  httpAgentOptions: {
    keepAlive: false,
    // keepAliveMsecs: 12000,
    // maxSockets: 25,
    // maxFreeSockets: 25,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "miajupiter.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "a0.muscache.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.gstatic.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
}
const withPWA = require("next-pwa")({
  dest: "public", // Destination directory for the PWA files
  disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
  register: true, // Register the PWA service worker
  skipWaiting: true, // Skip waiting for service worker activation
})

module.exports = withPWA(nextConfig)
