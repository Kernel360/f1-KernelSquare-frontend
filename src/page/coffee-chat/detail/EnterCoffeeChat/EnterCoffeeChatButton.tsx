"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { revalidatePage } from "@/util/actions/revalidatePage"
import { Button } from "@/components/ui/button"
import { enterChatRoom } from "@/service/coffee-chat"
import {
  PopupStorage,
  addPopupStorageItem,
  getPopupStorage,
} from "@/util/chat/popup"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { APIResponse } from "@/interfaces/dto/api-response"
import { useClientSession } from "@/hooks/useClientSession"
import { toast } from "react-toastify"
import { twMerge } from "tailwind-merge"
import { getKorDayjs } from "@/util/getDate"
import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"
dayjs.extend(isBetween)

export type EnterCoffeeChatProps = {
  articleTitle: string
  roomId: number | null
  startTime: string | null
  reservation_id: number
  className?: string
}

function EnterCoffeeChatButton({
  articleTitle,
  roomId,
  startTime,
  reservation_id,
  className,
}: EnterCoffeeChatProps) {
  const { user } = useClientSession()

  const {
    data: enterCoffeeChatActivePayload,
    status,
    error: enterCoffeeChatError,
  } = useQuery({
    queryKey: ["room", "active", reservation_id],
    queryFn: () =>
      enterChatRoom({ article_title: articleTitle, reservation_id }),
    select(response) {
      return response.data.data?.active ?? false
    },
  })

  const isRoomActive =
    status === "error" ? false : !!enterCoffeeChatActivePayload

  const buttonRef = useRef<HTMLButtonElement>(null)

  const [popupStorage, setPopupStorage] = useState<PopupStorage>(
    getPopupStorage(),
  )

  const hasPopup = popupStorage.includes(reservation_id)

  const buttonClassNames = (isPending: boolean) => {
    if (isPending) return "skeleton w-[120px] h-10 rounded-lg"

    return twMerge([
      `disabled:bg-colorsGray disabled:text-colorsDarkGray`,
      className,
    ])
  }

  const buttonText =
    status === "pending"
      ? ""
      : hasPopup
      ? `커피 챗 팝업 이용 중`
      : `커피 챗 입장하기`

  const disabled = !isValidTime(startTime) || hasPopup || roomId === null

  const openChatRoomPopup = () => {
    if (roomId === null) return

    const urlSearchParams = new URLSearchParams()
    urlSearchParams.set("popup", "true")
    urlSearchParams.set("title", articleTitle)

    const popup = window.open(
      `/chat/room/${reservation_id}?${urlSearchParams.toString()}`,
      "kernel_chat_window",
      "width=500, height=600",
    )

    setPopupStorage(addPopupStorageItem({ reservationId: reservation_id }))
  }

  const onSubmitEnterCoffeeChatRoom = () => {
    if (typeof window === "undefined") return

    const toastId = "openPopupError"

    if (!user) {
      toast.error("로그인 후 다시 시도해주세요", {
        position: "bottom-center",
        toastId,
      })

      revalidatePage("/chat/[id]", "page")

      return
    }

    if (!isRoomActive && status === "error") {
      const message =
        (enterCoffeeChatError as AxiosError<APIResponse>)?.response?.data.msg ??
        "입장 가능한 상태가 아닙니다."

      toast.error(message, {
        position: "bottom-center",
        toastId,
      })

      return
    }

    if (hasPopup) {
      toast.error("현재 커피챗 팝업이 활성화 되있습니다", {
        position: "bottom-center",
        toastId,
      })

      return
    }

    if (!isValidTime(startTime)) {
      toast.error("입장 가능한 시간이 아닙니다", {
        position: "bottom-center",
        toastId,
      })

      return
    }

    openChatRoomPopup()
  }

  useLayoutEffect(() => {
    const button = buttonRef.current

    if (button) {
      button.onclick = onSubmitEnterCoffeeChatRoom
    }

    const handleStorage = (e: StorageEvent) => {
      setPopupStorage(getPopupStorage())
    }

    window.addEventListener("storage", handleStorage)

    return () => {
      if (button) {
        button.onclick = null
      }

      window.removeEventListener("storage", handleStorage)
    }
  }, [status, hasPopup]) /* eslint-disable-line */

  return (
    <Button
      ref={buttonRef}
      disabled={!isRoomActive || disabled}
      className={buttonClassNames(status === "pending")}
    >
      {buttonText}
    </Button>
  )
}

export default EnterCoffeeChatButton

function isValidTime(startTime: string | null) {
  if (!startTime) return false

  const now = getKorDayjs(dayjs())

  const startKorTime = getKorDayjs(startTime)
  const endKorTime = startKorTime.clone().add(30, "minutes")

  const isBetween = now.isBetween(startKorTime, endKorTime, "minutes", "[)")

  return isBetween
}
