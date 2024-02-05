import Mentee from "@/components/shared/animation/Mentee"
import { errorMessage } from "@/constants/message"
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
      return (
        <div className="text-center">
          <div className="w-[400px] m-auto mt-[100px]">
            <Mentee />
          </div>
          <div className="text-xl">{errorMessage.unauthorized}.</div>
        </div>
      )
    }

    if (!user.roles.includes("ROLE_MENTOR")) {
      return (
        <div className="text-center">
          <div className="w-[400px] m-auto mt-[100px]">
            <Mentee />
          </div>
          <div className="text-xl">멘토에게만 허용된 기능입니다.</div>
        </div>
      )
    }

    return <CreateCoffeeChatReservationPage />
  } catch (error) {
    notFound()
  }
}
