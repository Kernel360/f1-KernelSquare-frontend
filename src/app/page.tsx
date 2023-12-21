import { layoutMeta } from "@/constants/layoutMeta"
import QnA from "@/page/qna/QnA"
import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

interface MainPageProps {
  searchParams: {
    page?: string
  }
}

export const metadata: Metadata = {
  title: `${layoutMeta["/"].title} - 커널스퀘어`,
  description: `${layoutMeta["/"].description}`,
}

export default async function Main({ searchParams }: MainPageProps) {
  const pageQuery = searchParams?.page

  if (!pageQuery) {
    const queryString = new URLSearchParams()
    queryString.set("page", "0")

    redirect(`?${queryString.toString()}`)
  }

  if (Number.isNaN(Number(pageQuery))) {
    notFound()
  }

  return <QnA />
}
