"use client"

import { QUESTION_QUERY_KEY } from "@/constants/queryKey"
import { getQuestion } from "@/service/question"
import { useQuery } from "@tanstack/react-query"

interface UseQuestionDetail {
  id: number
}

export function useQuestionDetail({ id }: UseQuestionDetail) {
  return useQuery({
    queryKey: QUESTION_QUERY_KEY.questionDetail(id),
    queryFn: () => getQuestion({ id }),
    select(payload) {
      return payload.data
    },
  })
}
