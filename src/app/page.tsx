import { layoutMeta } from "@/constants/layoutMeta"
import QnA from "@/page/QnA"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: `${layoutMeta["/"].title} - 커널스퀘어`,
  description: `${layoutMeta["/"].description}`,
}

export default function Main() {
  return <QnA />
}
