/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mobirise.com",
      },
    ],
  },
}

/*
  목업 프로필 이미지를 위해 image remote 설정
  이후 이미지 처리 로직에 따라 수정 예정
*/

module.exports = nextConfig
