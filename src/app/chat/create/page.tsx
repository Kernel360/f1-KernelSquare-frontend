import CreateCoffeeChatReservationPage from "@/page/coffee-chat/create/CreateCoffeeChatReservationPage"
import { getServerSession } from "@/util/auth"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: `커피챗 생성`,
  description: `커피챗 생성`,
}

export default async function CreateCoffeeChatPage() {
  const { user } = getServerSession()

  // [TODO]
  try {
    if (!user) {
      return <div>로그인 필요</div>
    }

    if (!user.roles.includes("ROLE_MENTOR")) {
      return <div>멘토 권한 없음</div>
    }

    return <CreateCoffeeChatReservationPage />
  } catch (error) {
    notFound()
  }
}
