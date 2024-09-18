/** @type {import('next').NextConfig} */


const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  webpack: (config, context) => {
    // Enable polling based on env variable being set
    if(process.env.NEXT_WEBPACK_USEPOLLING) {
      config.watchOptions = {
        poll: 10000,
        aggregateTimeout: 300
      }
    }
    return config
  },
}

export default nextConfig;
