import { getServerSession } from "@/util/auth"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import UpdateCoffeeChatPageUnauthorized from "../../_components/guard-page/update-chat/Unauthorized"
import UpdateCoffeeChatForbidden from "../../_components/guard-page/update-chat/Forbidden"
import { getCoffeeChatReservationDetail } from "@/service/coffee-chat"
import { AxiosError, HttpStatusCode } from "axios"
import { GetCoffeeChatReservationDetailResponse } from "@/interfaces/dto/coffee-chat/coffeechat-reservation-detail.dto"
import CreateCoffeeChatReservationPage from "@/page/coffee-chat/create/CreateCoffeeChatReservationPage"
import { getIntroduction } from "@/util/chat/getIntroduction"

export interface CoffeeChatUpdatePageProps {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: `커피챗 수정`,
  description: `커피챗 수정 페이지`,
  robots: {
    index: false,
  },
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

  try {
    if (!user) {
      return <UpdateCoffeeChatPageUnauthorized />
    }

    if (!user.roles.includes("ROLE_MENTOR")) {
      return <UpdateCoffeeChatForbidden />
    }

    const { data: coffeeChatDetailPayload } =
      await getCoffeeChatReservationDetail({
        postId: targetCoffeeChatId,
      })

    if (!coffeeChatDetailPayload.data) {
      return <>존재하지 않는 커피챗</>
    }

    if (coffeeChatDetailPayload.data?.nickname !== user.nickname) {
      return <UpdateCoffeeChatForbidden />
    }

    const introduction = await getIntroduction({
      articleId: targetCoffeeChatId,
    }).catch((err) => null)

    return (
      <CreateCoffeeChatReservationPage
        editMode="update"
        post_id={targetCoffeeChatId}
        initialCoffeeChat={{
          ...coffeeChatDetailPayload.data,
          introduction: introduction ?? "",
        }}
      />
    )
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } =
        error as AxiosError<GetCoffeeChatReservationDetailResponse>

      if (response?.status === HttpStatusCode.NotFound) {
        return <>존재하지 않는 커피챗</>
      }
    }

    notFound()
  }
}
