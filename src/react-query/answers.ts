import queryKey from "@/constants/queryKey"
import { CreateAnswerRequest } from "@/interfaces/dto/answer/create-answer.dto"
import { CreateVoteRequest } from "@/interfaces/dto/answer/create-vote.dto"
import { UpdateAnswerRequest } from "@/interfaces/dto/answer/update-answer.dto"
import { createAnswer, updateAnswer, voteAnswer } from "@/service/answers"
import { useMutation } from "@tanstack/react-query"

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

const useVoteAnswer = ({ answerId, member_id, status }: CreateVoteRequest) =>
  useMutation({
    mutationKey: [queryKey.answer],
    mutationFn: () => voteAnswer({ answerId, member_id, status }),
    onSuccess: () => console.log("투표 성공"),
    onError: (error) => console.log("error", error.message),
  })
export const answerQueries = { useCreateAnswer, useUpdateAnswer, useVoteAnswer }
