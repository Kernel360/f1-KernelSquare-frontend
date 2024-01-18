import queryKey from "@/constants/queryKey"
import type { DeleteQuestionRequest } from "@/interfaces/dto/question/delete-question.dto"
import type { GetQuestionRequest } from "@/interfaces/dto/question/get-question.dto"
import { deleteQuestion, getQuestion } from "@/service/question"
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query"

const useQuestionData = ({ id }: GetQuestionRequest) =>
  useQuery({
    queryKey: [queryKey.question, id],
    queryFn: () => getQuestion({ id }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
    select(payload) {
      return payload.data
    },
  })

const useDeleteAnswer = ({ questionId }: DeleteQuestionRequest) =>
  useMutation({
    mutationKey: [queryKey.question, questionId],
    mutationFn: () => deleteQuestion({ questionId }),
  })

export const questionQueries = {
  useQuestionData,
  useDeleteAnswer,
}
