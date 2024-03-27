import { layoutMeta } from "@/constants/layoutMeta"
import FaQ from "@/page/faq/FaQPage"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: `${layoutMeta["faq"].title}`,
  description: `${layoutMeta["faq"].description}`,
  openGraph: {
    title: `${layoutMeta["faq"].title} - 커널스퀘어`,
    description: `${layoutMeta["faq"].description}`,
    url: "https://kernelsquare.live/faq",
    images: {
      url: "/og.png",
      alt: "Kernel Square",
    },
  },
  twitter: {
    title: `${layoutMeta["faq"].title} - 커널스퀘어`,
    description: `${layoutMeta["faq"].description}`,
    images: {
      url: "/og.png",
      alt: "Kernel Square",
    },
  },
}

export default function FAQPage() {
  return <FaQ />
}
