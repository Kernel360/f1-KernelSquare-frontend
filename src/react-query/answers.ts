import queryKey from "@/constants/queryKey"
import { CreateAIAutoAnswerRequest } from "@/interfaces/dto/answer/create-AI-auto-answer"
import type { CreateVoteRequest } from "@/interfaces/dto/answer/create-vote.dto"
import { DeleteVoteRequest } from "@/interfaces/dto/answer/delete-vote.dto"
import type { UpdateAnswerRequest } from "@/interfaces/dto/answer/update-answer.dto"
import {
  createAIAutoAnswer,
  deleteVote,
  updateAnswer,
  voteAnswer,
} from "@/service/answers"
import { useMutation } from "@tanstack/react-query"

const useUpdateAnswer = ({ answerId }: { answerId: number }) => {
  const {
    mutate: updateAnswerMutate,
    isPending: isUpdateAnswer,
    isError: isUpdateAnswerError,
    isSuccess: isUpdateAnswerSuccess,
  } = useMutation({
    mutationKey: ["update", queryKey.answer, answerId],
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

const useCreateAIAutoAnswer = () => {
  const {
    mutate: createAIAutoAnswerMutate,
    isPending: isCreateAIAutoAnswerProceeding,
    isError: isCreateAIAutoAnswerError,
    isSuccess: isCreateAIAutoAnswerSuccess,
  } = useMutation({
    mutationKey: [queryKey.answer],
    mutationFn: ({ questionId }: CreateAIAutoAnswerRequest) =>
      createAIAutoAnswer({ questionId }),
  })

  return {
    createAIAutoAnswer: createAIAutoAnswerMutate,
    createAIAutoAnswerStatus: {
      isCreateAIAutoAnswerProceeding,
      isCreateAIAutoAnswerError,
      isCreateAIAutoAnswerSuccess,
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

const useDeleteVoteAnswer = () => {
  const {
    mutate: voteDeleteAnswerMutate,
    isPending: isDeleteVoteAnswer,
    isError: isDeleteVoteAnswerError,
    isSuccess: isDeleteVoteAnswerSuccess,
  } = useMutation({
    mutationKey: [queryKey.answer],
    mutationFn: ({ answerId }: DeleteVoteRequest) => deleteVote({ answerId }),
  })

  return {
    deleteVoteAnswer: voteDeleteAnswerMutate,
    deleteVoteAnswerStatus: {
      isDeleteVoteAnswer,
      isDeleteVoteAnswerError,
      isDeleteVoteAnswerSuccess,
    },
  }
}

export const answerQueries = {
  useUpdateAnswer,
  useCreateAIAutoAnswer,
  useVoteAnswer,
  useDeleteVoteAnswer,
}
