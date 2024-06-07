"use client"

import { CommentFormData } from "@/interfaces/form"
import { Control, FormState, useController } from "react-hook-form"
import {
  commentFormMessages,
  commentLengthLimit,
  commentRules,
} from "../../rules/commentRules"
import TextCounter from "@/components/shared/TextCounter"
import { useRecoilValue } from "recoil"
import { codingMeetingEditCommentAtom } from "@/recoil/atoms/coding-meeting/comment"
import { useClientSession } from "@/hooks/useClientSession"
import SubmitButton, {
  CreateCommentErrorCallback,
  CreateCommentInvalidCallback,
  CreateCommentSuccessCallback,
} from "../../SubmitButton"
import AutoResizeTextArea from "@/components/shared/textarea/AutoResizeTextArea"

interface CommentInputControllerProps {
  control: Control<CommentFormData, any>
  formState: FormState<CommentFormData>
  token: string
  onSubmitSuccess: CreateCommentSuccessCallback
  onSubmitError: CreateCommentErrorCallback
  onInvalid: CreateCommentInvalidCallback
}

function CommentInputController({
  control,
  formState,
  token,
  onSubmitSuccess,
  onSubmitError,
  onInvalid,
}: CommentInputControllerProps) {
  const { user } = useClientSession()

  const codingMeetingEditComment = useRecoilValue(codingMeetingEditCommentAtom)
  const isCommentEditing = !!codingMeetingEditComment.editingCommentToken

  const { field, fieldState } = useController({
    control,
    name: "comment",
    rules: commentRules("create"),
  })

  return (
    <div className="w-full flex justify-center items-center gap-4">
      <AutoResizeTextArea
        ref={field.ref}
        name={field.name}
        minRows={1}
        maxRows={22}
        value={field.value}
        disabled={!user || formState.isSubmitting || isCommentEditing}
        fullWidth
        className="flex-1 border border-[#E0E0E0] px-4 py-3 placeholder:text-[#BDBDBD] rounded-lg"
        placeholder={"댓글을 입력해주세요"}
        autoComplete="off"
        onChange={field.onChange}
      />
      <SubmitButton
        control={control}
        formState={formState}
        token={token}
        commentValue={field.value}
        onSubmitSuccess={onSubmitSuccess}
        onSubmitError={onSubmitError}
        onInvalid={onInvalid}
      />
      <TextCounter
        className="absolute left-0 -bottom-6"
        min={commentLengthLimit.min}
        max={commentLengthLimit.max}
        text={field.value ?? ""}
        target={!isCommentEditing && !!field.value}
        externalValidations={[
          {
            valid: fieldState.error?.message !== commentFormMessages.isEmpty,
            render: (
              <span className="text-danger">{commentFormMessages.isEmpty}</span>
            ),
          },
        ]}
      />
    </div>
  )
}

export default CommentInputController
