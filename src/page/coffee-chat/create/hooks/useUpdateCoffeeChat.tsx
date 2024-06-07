import { COFFEE_CHAT_QUERY_KEY } from "@/constants/queryKey"
import { useClientSession } from "@/hooks/useClientSession"
import { ReturnSyncOrPromise } from "@/interfaces/callback"
import {
  UpdateCoffeeChatPostRequest,
  UpdateCoffeeChatPostResponse,
} from "@/interfaces/dto/coffee-chat/update-coffeechat-post.dto"
import { updateCoffeeChatPost } from "@/service/coffee-chat"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"

export type UpdateCoffeeChatVariables = Omit<
  UpdateCoffeeChatPostRequest,
  "article_id" | "member_id"
>

interface UseUpdateCoffeeChat {
  articleId: number
  onSuccess?: (
    data: AxiosResponse<UpdateCoffeeChatPostResponse, any>,
    variables: UpdateCoffeeChatVariables,
    context: unknown,
  ) => ReturnSyncOrPromise
  onError?: (
    error: Error | AxiosError,
    variables: UpdateCoffeeChatVariables,
    context: unknown,
  ) => ReturnSyncOrPromise
}

export function useUpdateCoffeeChat({
  articleId,
  onSuccess,
  onError,
}: UseUpdateCoffeeChat) {
  const { user } = useClientSession()

  const { mutate: updateCoffeeChatApi, status: updateCoffeeChatApiStatus } =
    useMutation({
      mutationKey: COFFEE_CHAT_QUERY_KEY.updateCoffeeChat(articleId),
      mutationFn: (request: UpdateCoffeeChatVariables) =>
        updateCoffeeChatPost({
          ...request,
          member_id: user?.member_id ?? -1,
          article_id: articleId,
        }),
      onSuccess,
      onError,
    })

  return {
    updateCoffeeChatApi,
    updateCoffeeChatApiStatus,
  }
}
