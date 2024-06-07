"use client"

import { useClientSession } from "@/hooks/useClientSession"
import { CommentFormData } from "@/interfaces/form"
import { codingMeetingEditCommentAtom } from "@/recoil/atoms/coding-meeting/comment"
import { createCodingMeetingComment } from "@/service/coding-meetings"
import { AxiosError } from "axios"
import { Control, FieldErrors, FormState } from "react-hook-form"
import { FaRegCommentDots } from "react-icons/fa"
import { useRecoilValue } from "recoil"
import { Button } from "@/components/ui/button"

export type CreateCommentSuccessCallback =
  | ((data: CommentFormData) => void)
  | ((data: CommentFormData) => Promise<void>)

export type CreateCommentErrorCallback =
  | ((error: Error | AxiosError) => void)
  | ((error: Error | AxiosError) => Promise<void>)

export type CreateCommentInvalidCallback =
  | ((errors: FieldErrors<CommentFormData>) => void)
  | ((errors: FieldErrors<CommentFormData>) => Promise<void>)

interface SubmitButtonProps {
  control: Control<CommentFormData, any>
  token: string
  commentValue: string
  formState: FormState<CommentFormData>
  onSubmitSuccess: CreateCommentSuccessCallback
  onSubmitError: CreateCommentErrorCallback
  onInvalid: CreateCommentInvalidCallback
}

function SubmitButton({
  control,
  token,
  commentValue,
  formState,
  onSubmitSuccess,
  onSubmitError,
  onInvalid,
}: SubmitButtonProps) {
  const { user } = useClientSession()

  const codingMeetingEditComment = useRecoilValue(codingMeetingEditCommentAtom)
  const isCommentEditing = !!codingMeetingEditComment.editingCommentToken

  const onSubmit = async ({ comment }: CommentFormData) => {
    if (!user || formState.isSubmitting) return

    try {
      await createCodingMeetingComment({
        coding_meeting_token: token,
        coding_meeting_comment_content: comment,
      })

      onSubmitSuccess({ comment })
    } catch (error) {
      onSubmitError(error as Error | AxiosError)
    }
  }

  return (
    <Button
      disabled={
        !user ||
        !commentValue ||
        !!formState.errors?.comment ||
        formState.isSubmitting ||
        isCommentEditing
      }
      type="button"
      onClick={() => {
        control.handleSubmit(onSubmit, onInvalid)()
      }}
      className="self-start w-max h-[49px] disabled:bg-colorsGray disabled:text-colorsDarkGray"
    >
      <div className="flex justify-center items-center flex-shrink-0 gap-1">
        <FaRegCommentDots className="text-white flex-shrink-0" />
        <span className="text-white text-sm">댓글 작성</span>
      </div>
    </Button>
  )
}

export default SubmitButton
