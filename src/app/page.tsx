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

function isValidPageProps({ searchParams }: MainPageProps) {
  const pageQuery = searchParams?.page

  if (!pageQuery) return true

  if (pageQuery.includes(".")) return false

  const pageNumber = Number(pageQuery)

  if (pageNumber < 0 || Number.isNaN(pageNumber)) return false

  return true
}

export default async function Main({ searchParams }: MainPageProps) {
  if (!isValidPageProps({ searchParams })) {
    notFound()
  }

  const pageQuery = searchParams?.page

  if (!pageQuery) {
    const queryString = new URLSearchParams()
    queryString.set("page", "0")

    redirect(`?${queryString.toString()}`)
  }

  return <QnA />
}
