import queryKey from "@/constants/queryKey"
import { CreateAnswerRequest } from "@/interfaces/dto/answer/create-answer.dto"
import { CreateVoteRequest } from "@/interfaces/dto/answer/create-vote.dto"
import { GetAnswerRequest } from "@/interfaces/dto/answer/get-answerlist.dto"
import { UpdateAnswerRequest } from "@/interfaces/dto/answer/update-answer.dto"
import {
  createAnswer,
  getAnswer,
  updateAnswer,
  voteAnswer,
} from "@/service/answers"
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query"

const useGetAnswers = ({ questionId }: GetAnswerRequest) =>
  useQuery({
    queryKey: ["answer", questionId],
    queryFn: () => getAnswer({ questionId }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 5,
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

const useUpdateAnswer = ({
  answerId,
  content,
  image_url,
}: UpdateAnswerRequest) =>
  useMutation({
    mutationKey: [queryKey.answer],
    mutationFn: () => updateAnswer({ answerId, content, image_url }),
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
  useVoteAnswer,
}
