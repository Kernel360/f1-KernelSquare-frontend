import { layoutMeta } from "@/constants/layoutMeta"
import ChatMainPage from "@/page/coffee-chat/main/CoffeeChatMainPage"
import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

interface CoffeeChatMainPageProps {
  searchParams: {
    page?: string
  }
}

export const metadata: Metadata = {
  title: `${layoutMeta["chat"].title}`,
  description: `${layoutMeta["chat"].description}`,
  openGraph: {
    title: `${layoutMeta["chat"].title}`,
    description: `${layoutMeta["chat"].description}`,
    images: {
      url: "/og.png",
      alt: "Kernel Square",
    },
  },
  twitter: {
    title: `${layoutMeta["chat"].title}`,
    description: `${layoutMeta["chat"].description}`,
    images: {
      url: "/og.png",
      alt: "Kernel Square",
    },
  },
}

function isValidPageProps({ searchParams }: CoffeeChatMainPageProps) {
  const pageQuery = searchParams.page

  if (!pageQuery) return true

  if (pageQuery.includes(".")) return false

  const pageNumber = Number(pageQuery)

  if (pageNumber < 0 || Number.isNaN(pageNumber)) return false

  return true
}

export default function CoffeeChatMainPage({
  searchParams,
}: CoffeeChatMainPageProps) {
  if (!isValidPageProps({ searchParams })) {
    notFound()
  }

  const pageQuery = searchParams?.page

  if (!pageQuery) {
    const queryString = new URLSearchParams()
    queryString.set("page", "0")

    redirect(`/chat?${queryString.toString()}`)
  }

  return <ChatMainPage />
}
