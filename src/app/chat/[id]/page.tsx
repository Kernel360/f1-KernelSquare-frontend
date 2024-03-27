import { ApiStatus } from "@/constants/response/api"
import ChatDetailPage from "@/page/coffee-chat/detail/CoffeeChatDetailPage"
import { getCoffeeChatReservationDetail } from "@/service/coffee-chat"
import { AxiosError } from "axios"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import type { APIResponse } from "@/interfaces/dto/api-response"
import NotFound from "@/app/not-found"
import { extractTextFromMarkdown } from "@/util/markdown"

interface CoffeeChatDetailPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params,
}: CoffeeChatDetailPageProps): Promise<Metadata> {
  const fallbackMetadata: Record<"notFound" | "error", Metadata> = {
    notFound: {
      title: `존재하지 않는 커피챗`,
      description: `존재하지 않는 페이지에 대한 접근입니다.`,
      openGraph: {
        title: `존재하지 않는 커피챗`,
        description: `존재하지 않는 페이지에 대한 접근입니다.`,
        images: {
          url: "/og.png",
          alt: "Kernel Square",
        },
      },
      twitter: {
        title: `존재하지 않는 커피챗`,
        description: `존재하지 않는 페이지에 대한 접근입니다.`,
        images: {
          url: "/og.png",
          alt: "Kernel Square",
        },
      },
    },
    error: {
      title: "커피챗 상세 보기",
      description: "커피챗 상세 보기 페이지",
      openGraph: {
        title: "커피챗 상세 보기",
        description: "커피챗 상세 보기 페이지",
        images: {
          url: "/og.png",
          alt: "Kernel Square",
        },
      },
      twitter: {
        title: "커피챗 상세 보기",
        description: "커피챗 상세 보기 페이지",
        images: {
          url: "/og.png",
          alt: "Kernel Square",
        },
      },
    },
  }

  if (!isValidPageProps({ params })) {
    return fallbackMetadata.notFound
  }

  const id = Number(params.id)

  try {
    const { data: coffeeChatDetailPayload } =
      await getCoffeeChatReservationDetail({ postId: id })

    const coffeeChatDetail = coffeeChatDetailPayload.data

    if (!coffeeChatDetail) return fallbackMetadata.error

    const coffeeChatDetailContent = coffeeChatDetail.content
      ? extractTextFromMarkdown(coffeeChatDetail.content)
      : `${coffeeChatDetail.nickname} 님의 커피챗 페이지`

    return {
      title: `${coffeeChatDetail.title} (커피챗 상세 페이지)`,
      description: coffeeChatDetailContent,
      openGraph: {
        title: `${coffeeChatDetail.title} (커피챗 상세 페이지)`,
        description: coffeeChatDetailContent,
        url: `/chat/${params.id}`,
        images: {
          url: "/og.png",
          alt: "Kernel Square",
        },
      },
      twitter: {
        title: `${coffeeChatDetail.title} (커피챗 상세 페이지)`,
        description: coffeeChatDetailContent,
        images: {
          url: "/og.png",
          alt: "Kernel Square",
        },
      },
    }
  } catch (error) {
    return fallbackMetadata.error
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

    if (!res.data.data) return <NotFound />

    return (
      <div className="break-all">
        <ChatDetailPage coffeeChatDetailPayload={res.data.data} />
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
