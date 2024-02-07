import { layoutMeta } from "@/constants/layoutMeta"
import FaQ from "@/page/faq/FaQPage"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: `${layoutMeta["faq"].title}`,
  description: `${layoutMeta["faq"].description}`,
}

export default function FAQPage() {
  return <FaQ />
}
