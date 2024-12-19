/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/artifacts',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
