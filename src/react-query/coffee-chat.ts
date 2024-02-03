import queryKey from "@/constants/queryKey"
import { CreateCoffeeChatReservationRequest } from "@/interfaces/dto/coffee-chat/create-coffeechat-reservation.dto"
import { createCoffeeChatPost } from "@/service/coffee-chat"
import { useMutation } from "@tanstack/react-query"

const useCreateCoffeeChatPost = () => {
  const {
    data,
    mutate: createCoffeeChatPostMutate,
    isPending: isCoffeeChatPost,
    isError: isCoffeeChatPostrError,
    isSuccess: isCoffeeChatPostSuccess,
  } = useMutation({
    mutationKey: [queryKey.answer],
    mutationFn: ({
      member_id,
      title,
      content,
      hash_tags,
      date_times,
    }: CreateCoffeeChatReservationRequest) =>
      createCoffeeChatPost({
        member_id,
        title,
        content,
        hash_tags,
        date_times,
      }),
  })

  return {
    createCoffeeChatPostResponse: data,
    createCoffeeChatPost: createCoffeeChatPostMutate,
    createCoffeeChatPostStatus: {
      isCoffeeChatPost,
      isCoffeeChatPostrError,
      isCoffeeChatPostSuccess,
    },
  }
}

export const CoffeeChatQueries = {
  useCreateCoffeeChatPost,
}
