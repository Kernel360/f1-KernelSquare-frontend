"use client"

import { errorMessage } from "@/constants/message/error"
import successMessage from "@/constants/message/success"
import queryKey from "@/constants/queryKey"
import { useClientSession } from "@/hooks/useClientSession"
import { APIResponse } from "@/interfaces/dto/api-response"
import {
  MakeReservationRequest,
  MakeReservationResponse,
} from "@/interfaces/dto/coffee-chat/make-reservation.dto"
import { makeReservation } from "@/service/coffee-chat"
import { revalidatePage } from "@/util/actions/revalidatePage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

interface UseCreateChatReservation {
  handleManual?: boolean
  onSuccess?: (
    data: AxiosResponse<MakeReservationResponse, any>,
    variables: MakeReservationRequest,
    context: unknown,
  ) => void
  onError?: (
    error: Error | AxiosError,
    variables: MakeReservationRequest,
    context: unknown,
  ) => void
}

export function useCreateChatReservation({
  handleManual,
  onSuccess,
  onError,
}: UseCreateChatReservation = {}) {
  const queryClient = useQueryClient()

  const { replace } = useRouter()

  const { user, clientSessionReset } = useClientSession()

  const {
    mutate: createChatReservationApi,
    status: createChatReservationApiStatus,
  } = useMutation({
    mutationKey: ["create", "chatReservation"],
    mutationFn: (request: MakeReservationRequest) =>
      makeReservation({ ...request }),
    onSuccess(data, variables, context) {
      if (handleManual) {
        onSuccess && onSuccess(data, variables, context)
        return
      }

      queryClient.invalidateQueries({
        queryKey: [queryKey.myChatReservation],
      })

      revalidatePage("/chat/[id]", "page")

      setTimeout(() => {
        toast.success(successMessage.reserveCoffeeChat, {
          toastId: "successToCreateReservation",
          position: "top-center",
        })
      }, 0)
    },
    onError(error, variables, context) {
      if (handleManual) {
        onError && onError(error, variables, context)
        return
      }

      if (error instanceof AxiosError) {
        const { response } = error as AxiosError<APIResponse>

        if (response?.status === HttpStatusCode.NotFound) {
          queryClient.invalidateQueries({
            queryKey: ["chat", "list"],
          })

          replace("/chat?page=0")

          setTimeout(() => {
            toast.error(response?.data.msg ?? "존재하지 않는 예약입니다.", {
              toastId: "failToCancelReservation",
              position: "top-center",
            })
          }, 400)

          return
        }

        if (response?.status === HttpStatusCode.Unauthorized) {
          user && clientSessionReset()
        }

        queryClient.invalidateQueries({
          queryKey: [queryKey.myChatReservation],
        })

        setTimeout(() => {
          toast.error(response?.data.msg ?? errorMessage.reserveCoffeeChat, {
            toastId: "failToCreateReservation",
            position: "top-center",
          })
        }, 0)

        return
      }

      toast.error(errorMessage.reserveCoffeeChat, {
        toastId: "failToCreateReservation",
        position: "top-center",
      })
    },
  })

  return {
    createChatReservationApi,
    createChatReservationApiStatus,
  }
}
