import type { ModalState } from "@/interfaces/modal"
import type { Question } from "@/interfaces/question"

export interface QuestionProps {
  questionId: number
}

export interface DeleteQuestionProps {
  question: Question
  successModal: NonNullable<ModalState["content"]>
}
