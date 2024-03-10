"use client"

import { enterChatRoom } from "@/service/coffee-chat"
import { isValidTime } from "@/util/chat/time"
import { useQuery } from "@tanstack/react-query"

interface UseChatRoomActiveOption {
  startTime: string
  reservationId: number
  articleTitle: string
  throwOnRefetchError?: boolean
}

/**
 * 채팅방 입장하기 api를 통해 채팅방이 active 상태인지 검증하는 훅
 *
 * - `시작 ~ 시작+30분` (유효시간범위)인 경우에만 자동으로 fetch 하도록 하기 위해, enabled 옵션 적용
 *
 * - 유효시간범위인 경우 active 상태를 다시 확인할 수 있도록 하기 위해, refetch 함수 제공 (이후, SSE가 적용된다면 `deprecated` 될 수 있음)
 */
export function useChatRoomActive({
  articleTitle,
  startTime,
  reservationId,
  throwOnRefetchError = false,
}: UseChatRoomActiveOption) {
  const isValidTimeRange = isValidTime(startTime)

  const {
    data: chatRoomActivePayload,
    status,
    error: chatRoomActiveError,
    refetch,
    isRefetching,
  } = useQuery({
    enabled: isValidTimeRange,
    queryKey: ["room", "active", reservationId],
    queryFn: () =>
      enterChatRoom({
        article_title: articleTitle,
        reservation_id: reservationId,
      }),
    select(response) {
      return response.data.data?.active ?? false
    },
  })

  const refetchChatRoomActive = () => {
    if (isRefetching) return

    refetch({
      throwOnError: throwOnRefetchError,
    })
  }

  return {
    isChatRoomActive: !!chatRoomActivePayload,
    status: {
      queryStatus: status,
      isLoading: isValidTimeRange && status === "pending",
      isError: status === "error",
      isSuccess: status === "success",
      isRefetching,
    },
    isValidTimeRange,
    chatRoomActiveError,
    refetchChatRoomActive,
  }
}
