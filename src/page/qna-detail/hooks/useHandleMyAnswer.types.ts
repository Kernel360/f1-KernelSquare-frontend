import type { Answer } from "@/interfaces/answer"
import type { ModalState } from "@/interfaces/modal"

export interface EditValueProps {
  submitValue: string | undefined
  answer: Answer
}

export interface DeleteValueProps {
  answer: Answer
  successModal: NonNullable<ModalState["content"]>
}

export interface AnswerProps {
  answerId: number
}
