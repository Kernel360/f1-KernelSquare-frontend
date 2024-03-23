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
}

export default async function Main() {
  return <LandingPage />
}
