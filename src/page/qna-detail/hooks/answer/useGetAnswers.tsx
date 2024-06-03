"use client"

import { QUESTION_QUERY_KEY } from "@/constants/queryKey"
import { getAnswer } from "@/service/answers"
import { useQuery } from "@tanstack/react-query"

interface UseGetAnswers {
  questionId: number
}

export function useGetAnswers({ questionId }: UseGetAnswers) {
  return useQuery({
    queryKey: QUESTION_QUERY_KEY.questionAnswers(questionId),
    queryFn: () => getAnswer({ questionId }),
    select(payload) {
      return payload.data
    },
  })
}
