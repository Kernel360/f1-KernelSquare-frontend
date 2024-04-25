import { layoutMeta } from "@/constants/layoutMeta"
import LandingPage from "@/page/landing/Landing"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: `${layoutMeta["/"].title} - 커널스퀘어`,
  description: `${layoutMeta["/"].description}`,
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
