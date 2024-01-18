import type { Answer } from "@/interfaces/answer"
import type { ModalState } from "@/interfaces/modal"

export interface VoteProps {
  answer: Answer
}

export interface DeleteVoteProps {
  successModal: NonNullable<ModalState["content"]>
}
