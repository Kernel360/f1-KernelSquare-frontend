import PageNotFound from "@/page/notFound/PageNotFound"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "404 NotFound",
  description: "페이지를 찾을 수 없습니다",
}

export default function NotFound() {
  return <PageNotFound />
}
