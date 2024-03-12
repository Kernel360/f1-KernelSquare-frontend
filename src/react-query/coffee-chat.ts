import queryKey from "@/constants/queryKey"
import { CreateCoffeeChatPostRequest } from "@/interfaces/dto/coffee-chat/create-coffeechat-post.dto"
import { DeleteCoffeeChatRequest } from "@/interfaces/dto/coffee-chat/delete-coffeechat.dto"
import { DeleteReservationRequest } from "@/interfaces/dto/coffee-chat/delete-reservation.dto"
import { MakeReservationRequest } from "@/interfaces/dto/coffee-chat/make-reservation.dto"
import {
  createCoffeeChatPost,
  deleteCoffeeChatPost,
  deleteCoffeeChatReservation,
  getMyCoffeeChatReservation,
  makeReservation,
} from "@/service/coffee-chat"
import { useMutation, useQuery } from "@tanstack/react-query"

// 커피챗 등록글 생성
const useCreateCoffeeChatPost = () => {
  const {
    data,
    mutate: createCoffeeChatPostMutate,
    isPending: isCoffeeChatPost,
    isError: isCoffeeChatPostError,
    isSuccess: isCoffeeChatPostSuccess,
  } = useMutation({
    mutationKey: [queryKey.chat],
    mutationFn: ({
      member_id,
      title,
      content,
      hash_tags,
      date_times,
      introduction,
    }: CreateCoffeeChatPostRequest) =>
      createCoffeeChatPost({
        member_id,
        title,
        content,
        hash_tags,
        date_times,
        introduction,
      }),
  })

  return {
    createCoffeeChatPostResponse: data,
    createCoffeeChatPost: createCoffeeChatPostMutate,
    createCoffeeChatPostStatus: {
      isCoffeeChatPost,
      isCoffeeChatPostError,
      isCoffeeChatPostSuccess,
    },
  }
}

// 커피챗 등록글 삭제
const useDeleteCoffeeChatPost = () => {
  const {
    mutate: deleteCoffeeChatMutate,
    isPending: isdeleteCoffeeChat,
    isError: isdeleteCoffeeChatError,
    isSuccess: isdeleteCoffeeChatSuccess,
  } = useMutation({
    mutationKey: [queryKey.chat],
    mutationFn: ({ postId }: DeleteCoffeeChatRequest) =>
      deleteCoffeeChatPost({
        postId,
      }),
  })

  return {
    deleteCoffeeChatPost: deleteCoffeeChatMutate,
    deleteCoffeeChatPostStatus: {
      isdeleteCoffeeChat,
      isdeleteCoffeeChatError,
      isdeleteCoffeeChatSuccess,
    },
  }
}

// 내가 한 커피챗 예약 조회
const useGetMyCoffeeChatReservation = () =>
  useQuery({
    queryKey: [queryKey.chat],
    queryFn: () => getMyCoffeeChatReservation(),
    staleTime: 1000 * 60 * 2,
    retry: 0,
    select(payload) {
      return payload
    },
  })

// 커피챗 예약
const useCreateCoffeeChatReservation = () => {
  const {
    mutate: createCoffeeChatReservationMutate,
    isPending: isCoffeeChatReservation,
    isError: isCoffeeChatReservationError,
    isSuccess: isCoffeeChatReservationSuccess,
  } = useMutation({
    mutationKey: [queryKey.chat],
    mutationFn: ({
      reservation_article_id,
      reservation_id,
      member_id,
      reservation_start_time,
    }: MakeReservationRequest) =>
      makeReservation({
        reservation_article_id,
        reservation_id,
        member_id,
        reservation_start_time,
      }),
  })

  return {
    createCoffeeChatReservation: createCoffeeChatReservationMutate,
    createCoffeeChatReservationStatus: {
      isCoffeeChatReservation,
      isCoffeeChatReservationError,
      isCoffeeChatReservationSuccess,
    },
  }
}

// 커피챗 예약 삭제
const useDeleteCoffeeChatReservation = () => {
  const {
    mutate: deleteCoffeeChatReservationMutate,
    isPending: isdeleteCoffeeChatReservation,
    isError: isdeleteCoffeeChatReservationError,
    isSuccess: isdeleteCoffeeChatReservationSuccess,
  } = useMutation({
    mutationKey: [queryKey.chat],
    mutationFn: ({ reservationId }: DeleteReservationRequest) =>
      deleteCoffeeChatReservation({
        reservationId,
      }),
  })

  return {
    deleteCoffeeChatReservation: deleteCoffeeChatReservationMutate,
    deleteCoffeeChatReservationStatus: {
      isdeleteCoffeeChatReservation,
      isdeleteCoffeeChatReservationError,
      isdeleteCoffeeChatReservationSuccess,
    },
  }
}
export const CoffeeChatQueries = {
  useCreateCoffeeChatPost,
  useDeleteCoffeeChatPost,
  useGetMyCoffeeChatReservation,
  useCreateCoffeeChatReservation,
  useDeleteCoffeeChatReservation,
}
