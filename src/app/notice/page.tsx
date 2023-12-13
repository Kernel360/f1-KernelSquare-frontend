import { layoutMeta } from "@/constants/layoutMeta"
import Notice from "@/page/Notice"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: `${layoutMeta["notice"].title}`,
  description: `${layoutMeta["notice"].description}`,
}

export default function NoticePage() {
  return <Notice />
}
