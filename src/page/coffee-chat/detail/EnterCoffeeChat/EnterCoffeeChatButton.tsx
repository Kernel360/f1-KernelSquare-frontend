"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { revalidatePage } from "@/util/actions/revalidatePage"
import { Button } from "@/components/ui/button"
import {
  PopupStorage,
  addPopupStorageItem,
  getPopupStorage,
} from "@/util/chat/popup"
import { AxiosError } from "axios"
import { APIResponse } from "@/interfaces/dto/api-response"
import { useClientSession } from "@/hooks/useClientSession"
import { toast } from "react-toastify"
import { twMerge } from "tailwind-merge"
import { useChatRoomActive } from "@/hooks/chat/useChatRoomActive"

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
    isChatRoomActive,
    status: { isLoading, isError },
    chatRoomActiveError,
    isValidTimeRange,
  } = useChatRoomActive({
    articleTitle,
    reservationId: reservation_id,
    startTime: startTime ?? "",
  })

  const buttonRef = useRef<HTMLButtonElement>(null)

  const [popupStorage, setPopupStorage] = useState<PopupStorage>(() => {
    try {
      return getPopupStorage() ?? []
    } catch (error) {
      return []
    }
  })

  const hasPopup = popupStorage?.includes(reservation_id) ?? false

  const buttonClassNames = (isPending: boolean) => {
    if (isPending) return "skeleton w-[120px] h-10 rounded-lg"

    return twMerge([
      `disabled:bg-colorsGray disabled:text-colorsDarkGray`,
      className,
    ])
  }

  const buttonText = isLoading
    ? ""
    : hasPopup
    ? `커피 챗 이용 중`
    : `커피 챗 입장하기`

  const disabled = !isValidTimeRange || hasPopup || roomId === null

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

      revalidatePage("*")

      return
    }

    if (!isChatRoomActive && isError) {
      const message =
        (chatRoomActiveError as AxiosError<APIResponse>)?.response?.data.msg ??
        "입장 가능한 상태가 아닙니다."

      toast.error(message, {
        position: "bottom-center",
        toastId,
      })

      return
    }

    if (hasPopup) {
      toast.error("현재 해당 커피챗이 활성화 되있습니다", {
        position: "bottom-center",
        toastId,
      })

      return
    }

    if (!isValidTimeRange) {
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
    /* eslint-disable-next-line */
  }, [isChatRoomActive, isError, isValidTimeRange, hasPopup])

  return (
    <>
      <Button
        ref={buttonRef}
        disabled={!isChatRoomActive || disabled}
        className={buttonClassNames(isLoading)}
      >
        {buttonText}
      </Button>
    </>
  )
}

export default EnterCoffeeChatButton
