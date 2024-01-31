import queryKey from "@/constants/queryKey"
import type { CreateAnswerRequest } from "@/interfaces/dto/answer/create-answer.dto"
import type { CreateVoteRequest } from "@/interfaces/dto/answer/create-vote.dto"
import type { DeleteAnswerRequest } from "@/interfaces/dto/answer/delete-answer.dto"
import type { GetAnswerRequest } from "@/interfaces/dto/answer/get-answerlist.dto"
import type { UpdateAnswerRequest } from "@/interfaces/dto/answer/update-answer.dto"
import {
  createAnswer,
  deleteAnswer,
  getAnswer,
  updateAnswer,
  voteAnswer,
} from "@/service/answers"
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query"

const useGetAnswers = ({ questionId }: GetAnswerRequest) =>
  useQuery({
    queryKey: [queryKey.answer, questionId],
    queryFn: () => getAnswer({ questionId }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
    select(payload) {
      return payload.data
    },
  })

const useCreateAnswer = () => {
  const {
    mutate: createAnswerMutate,
    isPending: isCreateAnswer,
    isError: isCreateAnswerError,
    isSuccess: isCreateAnswerSuccess,
  } = useMutation({
    mutationKey: [queryKey.answer],
    mutationFn: ({
      questionId,
      member_id,
      content,
      image_url,
    }: CreateAnswerRequest) =>
      createAnswer({ questionId, member_id, content, image_url }),
  })

  return {
    createAnswer: createAnswerMutate,
    createAnswerStatus: {
      isCreateAnswer,
      isCreateAnswerError,
      isCreateAnswerSuccess,
    },
  }
}

const useUpdateAnswer = () => {
  const {
    mutate: updateAnswerMutate,
    isPending: isUpdateAnswer,
    isError: isUpdateAnswerError,
    isSuccess: isUpdateAnswerSuccess,
  } = useMutation({
    mutationKey: [queryKey.answer],
    mutationFn: ({ answerId, content, image_url }: UpdateAnswerRequest) =>
      updateAnswer({ answerId, content, image_url }),
  })

  return {
    updateAnswer: updateAnswerMutate,
    updateAnswerStatus: {
      isUpdateAnswer,
      isUpdateAnswerError,
      isUpdateAnswerSuccess,
    },
  }
}

const useDeleteAnswer = () => {
  const {
    mutate: deleteAnswerMutate,
    isPending: isDeleteAnswer,
    isError: isDeleteAnswerError,
    isSuccess: isDeleteAnswerSuccess,
  } = useMutation({
    mutationKey: [queryKey.answer],
    mutationFn: ({ answerId }: DeleteAnswerRequest) =>
      deleteAnswer({ answerId }),
  })

  return {
    deleteAnswer: deleteAnswerMutate,
    deleteAnswerStatus: {
      isDeleteAnswer,
      isDeleteAnswerError,
      isDeleteAnswerSuccess,
    },
  }
}

const useVoteAnswer = () => {
  const {
    mutate: voteAnswerMutate,
    isPending: isVoteAnswer,
    isError: isVoteAnswerError,
    isSuccess: isVoteAnswerSuccess,
  } = useMutation({
    mutationKey: [queryKey.answer],
    mutationFn: ({ answerId, member_id, status }: CreateVoteRequest) =>
      voteAnswer({ answerId, member_id, status }),
    onSuccess: () => console.log("투표 성공"),
    onError: (error) => console.log("error", error.message),
  })

  return {
    voteAnswer: voteAnswerMutate,
    voteAnswerStatus: {
      isVoteAnswer,
      isVoteAnswerError,
      isVoteAnswerSuccess,
    },
  }
}

export const answerQueries = {
  useGetAnswers,
  useCreateAnswer,
  useUpdateAnswer,
  useDeleteAnswer,
  useVoteAnswer,
}
