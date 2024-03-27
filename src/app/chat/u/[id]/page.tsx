import UpdateCoffeeChatReservationPage from "@/page/coffee-chat/update/UpdateCoffeeChatReservationPage"
import { getServerSession } from "@/util/auth"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export interface CoffeeChatUpdatePageProps {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: `커피챗 수정`,
  description: `커피챗 수정 페이지`,
  openGraph: {
    title: `커피챗 수정 - 커널스퀘어`,
    description: `커피챗 수정 페이지`,
    images: {
      url: "/og.png",
      alt: "Kernel Square",
    },
  },
  twitter: {
    title: `커피챗 수정 - 커널스퀘어`,
    description: `커피챗 수정 페이지`,
    images: {
      url: "/og.png",
      alt: "Kernel Square",
    },
  },
}

function isValidPageProps({ params }: CoffeeChatUpdatePageProps) {
  const id = params.id

  if (Number(id) < 0 || params.id.includes(".") || Number.isNaN(id)) {
    return false
  }

  return true
}

export default async function UpdateCoffeeChatPage({
  params,
}: CoffeeChatUpdatePageProps) {
  if (!isValidPageProps({ params })) {
    notFound()
  }

  const targetCoffeeChatId = Number(params.id)

  const { user } = getServerSession()

  // [TODO]
  try {
    if (!user) {
      return <div>로그인 필요</div>
    }

    if (!user.roles.includes("ROLE_MENTOR")) {
      return <div>멘토 권한 없음</div>
    }

    // if(user.nickname !== authorNickname) {
    //   return <div>작성자 아님</div>
    // }

    return <UpdateCoffeeChatReservationPage />
  } catch (error) {
    notFound()
  }
}
