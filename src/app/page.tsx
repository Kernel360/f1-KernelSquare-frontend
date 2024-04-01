import { layoutMeta } from "@/constants/layoutMeta"
import LandingPage from "@/page/landing/Landing"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: `${layoutMeta["/"].title} - 커널스퀘어`,
  description: `${layoutMeta["/"].description}`,
  verification:
    process.env.NEXT_PUBLIC_GA_ACTIVE === "enabled"
      ? {
          google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
          other: {
            "naver-site-verification":
              process.env.NEXT_PUBLIC_NAVER_VERIFICATION!,
          },
        }
      : undefined,
  openGraph: {
    title: `${layoutMeta["/"].title} - 커널스퀘어`,
    description: `${layoutMeta["/"].description}`,
    url: "https://kernelsquare.live",
    images: {
      url: "/og.png",
      alt: "Kernel Square",
    },
  },
  twitter: {
    title: `${layoutMeta["/"].title} - 커널스퀘어`,
    description: `${layoutMeta["/"].description}`,
    images: {
      url: "/og.png",
      alt: "Kernel Square",
    },
  },
}

export default async function Main() {
  return <LandingPage />
}
