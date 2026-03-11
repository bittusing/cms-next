/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com', 'via.placeholder.com'],
  },
  // Disable telemetry to avoid trace file issues
  experimental: {
    instrumentationHook: false,
  },
};

export default nextConfig;
