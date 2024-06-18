import { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "커널스퀘어",
    short_name: "커널스퀘어",
    description: "지속 가능한 성장을 위한 개발자 커뮤니티 커널스퀘어",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#97e75c",
    lang: "ko-KR",
    icons: [
      {
        src: "/icons/icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-128x128.png",
        sizes: "128x128",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "질문 작성",
        url: "/question",
        icons: [
          {
            src: "/icons/icon-96x96.png",
            sizes: "96x96",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    ],
  }
}
