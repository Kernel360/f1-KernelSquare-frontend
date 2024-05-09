"use client"

import { errorMessage } from "@/constants/message/error"
import successMessage from "@/constants/message/success"
import queryKey from "@/constants/queryKey"
import { useClientSession } from "@/hooks/useClientSession"
import { APIResponse } from "@/interfaces/dto/api-response"
import { DeleteCoffeeChatResponse } from "@/interfaces/dto/coffee-chat/delete-coffeechat.dto"
import { DeleteReservationRequest } from "@/interfaces/dto/coffee-chat/delete-reservation.dto"
import { deleteCoffeeChatReservation } from "@/service/coffee-chat"
import { revalidatePage } from "@/util/actions/revalidatePage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

interface UseDeleteChatReservation {
  handleManual?: boolean
  onSuccess?: (
    data: AxiosResponse<DeleteCoffeeChatResponse, any>,
    variables: DeleteReservationRequest,
    context: unknown,
  ) => void
  onError?: (
    error: Error | AxiosError,
    variables: DeleteReservationRequest,
    context: unknown,
  ) => void
}

export function useDeleteChatReservation({
  handleManual,
  onSuccess,
  onError,
}: UseDeleteChatReservation = {}) {
  const queryClient = useQueryClient()

  const { replace } = useRouter()

  const { user, clientSessionReset } = useClientSession()

  const {
    mutate: deleteChatReservationApi,
    status: deleteChatReservationApiStatus,
  } = useMutation({
    mutationKey: ["delete", "chatReservation"],
    mutationFn: (request: DeleteReservationRequest) =>
      deleteCoffeeChatReservation({ ...request }),
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
        toast.success(successMessage.deleteCoffeeChatReservation, {
          toastId: "successToDeleteReservation",
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
          toast.error(response?.data.msg ?? errorMessage.cancelReservation, {
            toastId: "failToCancelReservation",
            position: "top-center",
          })
        }, 0)

        return
      }

      toast.error(errorMessage.cancelReservation, {
        toastId: "failToCancelReservation",
        position: "top-center",
      })
    },
  })

  return {
    deleteChatReservationApi,
    deleteChatReservationApiStatus,
  }
}
