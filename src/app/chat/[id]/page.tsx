import { ApiStatus } from "@/constants/response/api"
import ChatDetailPage from "@/page/coffee-chat/detail/CoffeeChatDetailPage"
import { getCoffeeChatReservationDetail } from "@/service/coffee-chat"
import { AxiosError } from "axios"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import type { APIResponse } from "@/interfaces/dto/api-response"

interface CoffeeChatDetailPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params,
}: CoffeeChatDetailPageProps): Promise<Metadata> {
  if (!isValidPageProps({ params })) {
    return {
      title: `커피챗 상세 페이지`,
      description: `커피챗 상세 페이지`,
    }
  }

  const id = Number(params.id)

  // [TODO]
  try {
    return {
      title: `커피챗 상세 페이지`,
      description: `커피챗 상세 페이지`,
    }
  } catch (error) {
    return {
      title: `커피챗 상세 페이지`,
      description: `커피챗 상세 페이지`,
    }
  }
}

function isValidPageProps({ params }: CoffeeChatDetailPageProps) {
  const id = params.id

  if (Number(id) < 0 || params.id.includes(".") || Number.isNaN(Number(id))) {
    return false
  }

  return true
}

export default async function CoffeeChatDetailPage({
  params,
}: CoffeeChatDetailPageProps) {
  const id = Number(params.id)

  if (!isValidPageProps({ params })) {
    notFound()
  }

  try {
    const res = await getCoffeeChatReservationDetail({ postId: id })

    return (
      <div className="break-all">
        <ChatDetailPage coffeeChatDetailPayload={res.data.data!} />
      </div>
    )
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error as AxiosError<APIResponse>

      if (
        response?.status ===
        ApiStatus.CoffeeChat.getCoffeeChatPostDetail.NotFound.HttpStatus
      ) {
        return <div>존재하지 않는 커피챗</div>
      }
    }

    notFound()
  }
}
