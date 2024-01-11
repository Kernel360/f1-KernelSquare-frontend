/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mobirise.com",
      },
      // 배지 이미지 주소
      {
        protocol: "https",
        hostname: "imagedelivery.net",
      },
      // 목업 이미지 주소
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      // 클라우드 플레어 이미지 cdn 주소
      {
        protocol: "https",
        hostname: "imagedelivery.net",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "kernel-square-bucket.s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },
}

module.exports = nextConfig
