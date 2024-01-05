import queryKey from "@/constants/queryKey"
import type { GetQuestionRequest } from "@/interfaces/dto/question/get-question.dto"
import { getQuestion } from "@/service/question"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

const useQuestionData = ({ id }: GetQuestionRequest) =>
  useQuery({
    queryKey: [queryKey.question, id],
    queryFn: () => getQuestion({ id }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 5,
    select(payload) {
      return payload.data
    },
  })

export const questionQueries = {
  useQuestionData,
}
