import ConfirmModal from "@/components/shared/confirm-modal/ConfirmModal"
import { QUESTION_QUERY_KEY } from "@/constants/queryKey"
import { useClientSession } from "@/hooks/useClientSession"
import useModal from "@/hooks/useModal"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { VoteStatus, type Answer } from "@/interfaces/answer"
import type { ModalState } from "@/interfaces/modal"
import successMessage from "@/constants/message/success"
import { useVoteAnswer } from "./answer/vote/useVoteAnswer"
import { useDeleteVoteAnswer } from "./answer/vote/useDeleteVoteAnswer"
import { validationMessage } from "@/constants/message/validation"

export interface VoteProps {
  answer: Answer
}

export interface DeleteVoteProps {
  successModal: NonNullable<ModalState["content"]>
}

const useAnswerVote = ({ answer }: VoteProps) => {
  const queryClient = useQueryClient()
  const { user } = useClientSession()

  const { openModal, closeModal } = useModal()

  const { voteAnswerApi, voteAnswerApiStatus } = useVoteAnswer({
    answerId: answer.answer_id,
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: QUESTION_QUERY_KEY.questionAnswers(answer.question_id),
      })

      setTimeout(() => {
        toast.success(
          variables.voteStatus === VoteStatus.LIKED
            ? "UP(추천) 투표를 성공했습니다"
            : "DOWN(비추천) 투표를 성공했습니다",
          {
            position: "top-center",
          },
        )
      }, 0)
    },
  })

  const { deleteVoteAnswerApi, deleteVoteAnswerApiStatus } =
    useDeleteVoteAnswer({
      answerId: answer.answer_id,
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries({
          queryKey: QUESTION_QUERY_KEY.questionAnswers(answer.question_id),
        })

        setTimeout(() => {
          toast.success(successMessage.cancelVote, {
            position: "top-center",
          })
        }, 0)
      },
    })

  const deleteVoteAnswer = () => {
    if (deleteVoteAnswerApiStatus === "pending") return

    const onAgreeDeleteVoteAnswer = () => {
      deleteVoteAnswerApi()
    }

    openModal({
      containsHeader: false,
      content: (
        <ConfirmModal.ModalContent
          onSuccess={onAgreeDeleteVoteAnswer}
          onCancel={closeModal}
          situation="cancelVote"
        />
      ),
    })
  }

  const voteLikeAnswer = () => {
    if (!user) {
      toast.error("로그인 후 투표가 가능합니다", {
        toastId: "NotLogined",
        position: "top-center",
      })

      return
    }

    if (answer.member_nickname === user?.nickname) {
      toast.error(validationMessage.voteForMe, {
        toastId: "voteForMe",
        position: "top-center",
      })

      return
    }

    if (voteAnswerApiStatus === "pending") return

    answer.vote_status === VoteStatus.NONE
      ? voteAnswerApi({ voteStatus: VoteStatus.LIKED })
      : deleteVoteAnswer()
  }

  const voteDisLikeAnswer = () => {
    if (!user) {
      toast.error("로그인 후 투표가 가능합니다", {
        toastId: "NotLogined",
        position: "top-center",
      })

      return
    }

    if (answer.member_nickname === user?.nickname) {
      toast.error(validationMessage.voteForMe, {
        toastId: "voteForMe",
        position: "top-center",
      })

      return
    }

    if (voteAnswerApiStatus === "pending") return

    answer.vote_status === VoteStatus.NONE
      ? voteAnswerApi({ voteStatus: VoteStatus.DISLIKED })
      : deleteVoteAnswer()
  }

  return {
    voteLikeAnswer,
    voteDisLikeAnswer,
  }
}

export default useAnswerVote
