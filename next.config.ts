import { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'res.cloudinary.com',
        protocol: 'https',
        port: ''
      },
      {
        hostname: 'lh3.googleusercontent.com',
        protocol: 'https',
        port: ''
      },
      {
        hostname: 'avatars.githubusercontent.com',
        protocol: 'https',
        port: ''
      }
    ]
  }
};

export default nextConfig;
