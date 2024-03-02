/** @type {import('next').NextConfig} */
// const withMDX=require('@next/mdx')

const nextConfig = {
  reactStrictMode: true,
  basePath: "",
  output: "standalone",
  poweredByHeader: false,
  cleanDistDir: true,
  crossOrigin: 'anonymous',
  compress: false,
  pageExtensions:['ts','tsx','jsx','mdx'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eu2.contabostorage.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "tourabi.s3.eu-central-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
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
  cacheOnFrontEndNav: true,

})

module.exports = withPWA(nextConfig)
// module.exports = nextConfig
