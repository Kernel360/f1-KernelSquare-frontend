import queryKey from "@/constants/queryKey"
import type { GetSearchQuestionRequest } from "@/interfaces/dto/search/search-questions.dto"
import { getSearchQuestions } from "@/service/search"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

export const useSearchQuestion = ({
  keyword,
  page,
}: GetSearchQuestionRequest) =>
  useQuery({
    queryKey: [queryKey.question, keyword, page],
    queryFn: () => getSearchQuestions({ page: Number(page), keyword }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
    select(payload) {
      return payload.data.data
    },
  })
