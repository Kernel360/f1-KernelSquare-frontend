import CreateCoffeeChatReservationPage from "@/page/coffee-chat/create/CreateCoffeeChatReservationPage"
import { getServerSession } from "@/util/auth"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import CreateChatPageUnauthorized from "../_components/guard-page/create-chat/Unauthorized"
import CreateChatForbidden from "../_components/guard-page/create-chat/Forbidden"

export const metadata: Metadata = {
  title: `커피챗 생성`,
  description: `커피챗 생성 페이지`,
  robots: {
    index: false,
  },
  openGraph: {
    title: `커피챗 생성 - 커널스퀘어`,
    description: `커피챗 생성 페이지`,
    images: {
      url: "/og.png",
      alt: "Kernel Square",
    },
  },
  twitter: {
    title: `커피챗 생성 - 커널스퀘어`,
    description: `커피챗 생성 페이지`,
    images: {
      url: "/og.png",
      alt: "Kernel Square",
    },
  },
}

export default function CreateCoffeeChatPage() {
  const { user } = getServerSession()

  try {
    if (!user) {
      return <CreateChatPageUnauthorized />
    }

    if (!user.roles.includes("ROLE_MENTOR")) {
      return <CreateChatForbidden />
    }

    return <CreateCoffeeChatReservationPage />
  } catch (error) {
    notFound()
  }
}
