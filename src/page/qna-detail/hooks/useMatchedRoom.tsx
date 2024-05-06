"use client"

import queryKey from "@/constants/queryKey"
import { MatchedRoom } from "@/interfaces/coffee-chat"
import { GetCoffeeChatReservationDetailResponse } from "@/interfaces/dto/coffee-chat/coffeechat-reservation-detail.dto"
import { GetMyCoffeeChatReservationListResponse } from "@/interfaces/dto/coffee-chat/get-my-coffeechat-reservation"
import {
  getCoffeeChatReservationDetail,
  getMyCoffeeChatReservation,
} from "@/service/coffee-chat"
import { findMatchedRoom } from "@/util/chat/reservation"
import { UseQueryResult, useQueries } from "@tanstack/react-query"
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios"
import { useCallback } from "react"

interface UseMathcedRoom {
  coffeeChatId: number
}

type CombineReturn = {
  matchedRoom: MatchedRoom | null
  pending: boolean
  unauthorizedStatus: "idle" | boolean
}
type Combine = (
  results: [
    UseQueryResult<
      AxiosResponse<GetCoffeeChatReservationDetailResponse, any>,
      Error
    >,
    UseQueryResult<
      AxiosResponse<GetMyCoffeeChatReservationListResponse, any>,
      Error
    >,
  ],
) => CombineReturn

export function useMatchedRoom({ coffeeChatId }: UseMathcedRoom) {
  const combine: Combine = useCallback((results) => {
    const [coffeeChatDetail, myCoffeeChatReservations] = results

    if (!coffeeChatDetail || !myCoffeeChatReservations) {
      return {
        matchedRoom: null,
        pending: true,
        unauthorizedStatus: "idle",
      }
    }

    const matchedRoom = findMatchedRoom({
      myCoffeeChatReservations:
        myCoffeeChatReservations?.data?.data.data?.reservation_responses ??
        null,
      coffeeChatReservations:
        coffeeChatDetail?.data?.data.data?.date_times ?? [],
    })

    const unauthorizedStatus = myCoffeeChatReservations.isPending
      ? ("idle" as const)
      : !!myCoffeeChatReservations.error
      ? myCoffeeChatReservations.error instanceof AxiosError &&
        myCoffeeChatReservations.error.response?.status ===
          HttpStatusCode.Unauthorized
      : false

    return {
      matchedRoom: unauthorizedStatus === true ? null : matchedRoom,
      pending: coffeeChatDetail.isPending || myCoffeeChatReservations.isPending,
      unauthorizedStatus,
    }
  }, [])

  const combinedResult = useQueries({
    queries: [
      {
        queryKey: [queryKey.chat, coffeeChatId],
        queryFn: () => getCoffeeChatReservationDetail({ postId: coffeeChatId }),
      },
      {
        queryKey: [queryKey.myChatReservation],
        queryFn: () => getMyCoffeeChatReservation(),
      },
    ],
    combine,
  })

  return combinedResult
}
