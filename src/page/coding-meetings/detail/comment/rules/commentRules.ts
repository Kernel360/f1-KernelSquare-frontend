import { CommentFormData, CommentUpdateFormData } from "@/interfaces/form"
import { CodingMeetingEditCommentAtom } from "@/recoil/atoms/coding-meeting/comment"
import { RegisterOptions } from "react-hook-form"
import { SetterOrUpdater } from "recoil"

type Action = "create" | "update"

type CreateCommentRules = Omit<
  RegisterOptions<CommentFormData, "comment">,
  "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
>

type UpdateCommentRules = Omit<
  RegisterOptions<CommentUpdateFormData, "commentForUpdate">,
  "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
>

export const commentLengthLimit = {
  min: 1,
  max: 300,
} as const

export const commentFormMessages = {
  required: "댓글을 작성해주세요.",
  maxLength: "댓글은 최대 300자까지 작성가능합니다.",
  isEqual: "댓글 내용이 이전과 동일합니다.",
  isEmpty: "댓글에는 공백만 입력할 수 없습니다.",
} as const

const validateEmpty = (value: string) => {
  if (value.length && value.trim().length !== 0) return true

  return commentFormMessages.isEmpty
}

export function commentRules(action: "create"): CreateCommentRules
export function commentRules(action: "update"): UpdateCommentRules
export function commentRules<T extends Action>(
  action: T,
): CreateCommentRules | UpdateCommentRules {
  if (action === "create") {
    return {
      required: true,
      maxLength: {
        value: commentLengthLimit.max,
        message: commentFormMessages.maxLength,
      },
      validate: validateEmpty,
    }
  }

  return {
    required: true,
    maxLength: {
      value: commentLengthLimit.max,
      message: commentFormMessages.maxLength,
    },
    validate: validateEmpty,
  }
}
