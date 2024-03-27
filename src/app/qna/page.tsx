import QnA from "@/page/qna/QnA"
import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

interface QnaPageProps {
  searchParams: {
    page?: string
  }
}

export const metadata: Metadata = {
  title: `개발자 Q&A`,
  description: `궁금한 내용을 질문하거나 질문에 답변을 남겨보세요`,
  openGraph: {
    title: `개발자 Q&A - 커널스퀘어`,
    description: `궁금한 내용을 질문하거나 질문에 답변을 남겨보세요`,
    images: {
      url: "/og.png",
      alt: "Kernel Square",
    },
  },
  twitter: {
    title: `개발자 Q&A - 커널스퀘어`,
    description: `궁금한 내용을 질문하거나 질문에 답변을 남겨보세요`,
    images: {
      url: "/og.png",
      alt: "Kernel Square",
    },
  },
}

function isValidPageProps({ searchParams }: QnaPageProps) {
  const pageQuery = searchParams?.page

  if (!pageQuery) return true

  if (pageQuery.includes(".")) return false

  const pageNumber = Number(pageQuery)

  if (pageNumber < 0 || Number.isNaN(pageNumber)) return false

  return true
}

export default function Qna({ searchParams }: QnaPageProps) {
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
