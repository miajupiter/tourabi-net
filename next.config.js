/** @type {import('next').NextConfig} */
const nextConfig = {

  reactStrictMode: false,
  // swcMinify: true,
  appDir: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: "/static",
  },
  
  // cleanDistDir: true,
  // output:"standalone",
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

module.exports = nextConfig
