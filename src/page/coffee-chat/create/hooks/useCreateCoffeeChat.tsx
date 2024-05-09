"use client"

import { errorMessage } from "@/constants/message/error"
import notificationMessage from "@/constants/message/notification"
import queryKey from "@/constants/queryKey"
import { APIResponse } from "@/interfaces/dto/api-response"
import {
  CreateCoffeeChatPostRequest,
  CreateCoffeeChatPostResponse,
} from "@/interfaces/dto/coffee-chat/create-coffeechat-post.dto"
import { createCoffeeChatPost } from "@/service/coffee-chat"
import { revalidatePage } from "@/util/actions/revalidatePage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

interface UseCreateCoffeeChat {
  memberId: number
  handleManual?: boolean
  onSuccess?: (
    data: AxiosResponse<CreateCoffeeChatPostResponse, any>,
    variables: CreateCoffeeChatPostRequest,
    context: unknown,
  ) => void
  onError?: (
    error: Error | AxiosError,
    variables: CreateCoffeeChatPostRequest,
    context: unknown,
  ) => void
}

export function useCreateCoffeeChat({
  memberId,
  handleManual,
  onSuccess,
  onError,
}: UseCreateCoffeeChat) {
  const queryClient = useQueryClient()
  const { replace } = useRouter()

  const { mutate: createCoffeeChatApi, status: createCoffeeChatApiStatus } =
    useMutation({
      mutationKey: [queryKey.chat, "createChat", "by", memberId],
      mutationFn: (request: CreateCoffeeChatPostRequest) =>
        createCoffeeChatPost({ ...request }),
      onSuccess(response, variables, context) {
        if (handleManual) {
          onSuccess && onSuccess(response, variables, context)
          return
        }

        const payload = response.data.data
        const createdChatId = payload?.reservation_article_id

        queryClient.invalidateQueries({ queryKey: [queryKey.chat] })

        replace(createdChatId ? `/chat/${createdChatId}` : "/chat?page=0")
      },
      onError(error, variables, context) {
        if (handleManual) {
          onError && onError(error, variables, context)
          return
        }

        if (error instanceof AxiosError) {
          const { response } = error as AxiosError<APIResponse>

          if (response?.status === HttpStatusCode.Unauthorized) {
            revalidatePage("/chat/create", "page")

            setTimeout(() => {
              toast.error(notificationMessage.unauthorized, {
                toastId: "createChatUnauthorized",
                position: "bottom-center",
              })
            }, 0)

            return
          }

          toast.error(response?.data.msg ?? errorMessage.createCoffeeChat, {
            toastId: "createChatAPiError",
            position: "top-center",
          })

          return
        }

        toast.error(errorMessage.createCoffeeChat, {
          toastId: "createChatError",
          position: "top-center",
        })
      },
    })

  return {
    createCoffeeChatApi,
    createCoffeeChatApiStatus,
  }
}
