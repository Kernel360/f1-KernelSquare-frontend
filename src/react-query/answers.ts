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
    queryKey: [queryKey.answer],
    queryFn: () => getAnswer({ questionId }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
    select(payload) {
      return payload.data
    },
  })

const useCreateAnswer = ({
  questionId,
  member_id,
  content,
  image_url,
}: CreateAnswerRequest) =>
  useMutation({
    mutationKey: [queryKey.answer],
    mutationFn: () =>
      createAnswer({ questionId, member_id, content, image_url }),
  })

const useUpdateAnswer = () => {
  const {
    mutate: updateAnswerMutate,
    isPending: isUpdateAnswer,
    isError: isUpdaetAnswerError,
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
      isUpdaetAnswerError,
      isUpdateAnswerSuccess,
    },
  }
}

const useDeleteAnswer = ({ answerId }: DeleteAnswerRequest) =>
  useMutation({
    mutationKey: [queryKey.answer],
    mutationFn: () => deleteAnswer({ answerId }),
  })

const useVoteAnswer = () =>
  useMutation({
    mutationKey: ["ans"],
    mutationFn: ({ answerId, member_id, status }: CreateVoteRequest) =>
      voteAnswer({ answerId, member_id, status }),
    onSuccess: () => console.log("투표 성공"),
    onError: (error) => console.log("error", error.message),
  })

export const answerQueries = {
  useGetAnswers,
  useCreateAnswer,
  useUpdateAnswer,
  useDeleteAnswer,
  useVoteAnswer,
}
