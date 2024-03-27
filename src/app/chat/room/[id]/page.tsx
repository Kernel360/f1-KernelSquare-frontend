import { AxiosError, HttpStatusCode } from "axios"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import dynamic from "next/dynamic"
import { getServerSession } from "@/util/auth"
import { enterChatRoom } from "@/service/coffee-chat"
import ChatError from "../../_components/ChatError"
import { ApiStatus } from "@/constants/response/api"
import type { APIResponse } from "@/interfaces/dto/api-response"

interface EnterRoomErrorCause {
  type: "nonAcitve" | "notMatch"
}

class EnterRoomError extends Error {
  cause: EnterRoomErrorCause

  constructor(cause: EnterRoomErrorCause) {
    super("enterRoomError")
    this.cause = { ...cause }
  }
}

const ChatRoom = dynamic(() => import("@/page/coffee-chat/chat/ChatRoom"), {
  ssr: false,
})

interface CoffeeChatRoomProps {
  params: {
    id: string
  }
  searchParams?: {
    popup?: string
    title?: string
  }
}

export const metadata: Metadata = {
  title: `커피챗 채팅`,
  description: `커피챗 채팅 페이지`,
  openGraph: {
    title: `커피챗 채팅`,
    description: `커피챗 채팅 페이지`,
    images: {
      url: "/og.png",
      alt: "Kernel Square",
    },
  },
  twitter: {
    title: `커피챗 채팅`,
    description: `커피챗 채팅 페이지`,
    images: {
      url: "/og.png",
      alt: "Kernel Square",
    },
  },
}

function isValidPageProps({ params, searchParams }: CoffeeChatRoomProps) {
  const id = params.id

  if (Number(id) < 0 || id.includes(".") || Number.isNaN(Number(id))) {
    return false
  }

  if (!searchParams) {
    return false
  }

  const { popup, title } = searchParams

  if (!title) return false
  if (popup && popup !== "true") {
    return false
  }

  return true
}

export default async function CoffeeChatRoomPage({
  params,
  searchParams,
}: CoffeeChatRoomProps) {
  const { user } = getServerSession()

  const reservationId = Number(params.id)

  if (!isValidPageProps({ params, searchParams })) {
    notFound()
  }

  if (!user) return <ChatError errorType="LoginRequired" />

  const articleTitle = searchParams!.title!

  try {
    const enterChatRoomResponse = await enterChatRoom({
      article_title: articleTitle,
      reservation_id: reservationId,
    })

    const { active, room_key, article_title, expiration_time } =
      enterChatRoomResponse.data.data!

    if (!active) {
      throw new EnterRoomError({ type: "nonAcitve" })
    }

    if (articleTitle !== article_title) {
      throw new EnterRoomError({ type: "notMatch" })
    }

    console.log({ active, room_key, article_title, expiration_time })

    return (
      <ChatRoom
        serverUrl={`${process.env.NEXT_PUBLIC_WS}`}
        roomKey={room_key}
        reservation_id={reservationId}
        articleTitle={articleTitle}
        user={user}
        expiration_time={expiration_time}
      />
    )
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error as AxiosError<APIResponse>

      if (
        response?.status ===
        ApiStatus.CoffeeChat.enterChatRoom.NotFound.HttpStatus
      ) {
        return (
          <ChatError errorType="NotFound" errorMessage={response.data.msg} />
        )
      }

      if (response?.status === HttpStatusCode.BadRequest) {
        if (
          response.data.code ===
          ApiStatus.CoffeeChat.enterChatRoom.UnactiveRoom.Code
        ) {
          return (
            <ChatError errorType="Unactived" errorMessage={response.data.msg} />
          )
        }

        return (
          <ChatError
            errorType="Unauthorization"
            errorMessage={response.data.msg}
          />
        )
      }

      return (
        <ChatError
          errorType="InternalServer"
          errorMessage={response?.data.msg}
        />
      )
    }

    if (error instanceof EnterRoomError) {
      const { type } = error.cause

      if (type === "nonAcitve") return <ChatError errorType="Unactived" />
      if (type === "notMatch") return <ChatError errorType="NotMatch" />
    }

    return <ChatError errorType="InternalServer" />
  }
}
