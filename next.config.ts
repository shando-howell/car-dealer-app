import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {

    remotePatterns: [
      { 
        protocol: "https",
        hostname: "s3.eu-west-1.amazonaws.com",
        port: '',
        pathname: 'car-dealer-website.s3.eu-west-1.amazonaws.com',
        search: ''
        // hostname: "" 
      }
    ]
  }
};

export default nextConfig;
