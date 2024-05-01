"use client"

import { CommentFormData } from "@/interfaces/form"
import { Control, Controller, FormState } from "react-hook-form"
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

  return (
    <Controller
      control={control}
      name="comment"
      rules={commentRules("create")}
      render={({ field, fieldState }) => {
        return (
          <div className="w-full flex justify-center items-center gap-4">
            <textarea
              ref={field.ref}
              name={field.name}
              rows={1}
              value={field.value}
              disabled={!user || formState.isSubmitting || isCommentEditing}
              className="resize-none flex-1 box-border px-4 py-3 placeholder:text-[#BDBDBD] border border-[#E0E0E0] rounded-lg"
              placeholder={"댓글을 입력해주세요(300자 이하)"}
              autoComplete="off"
              onChange={field.onChange}
              onBlur={field.onBlur}
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
                  valid:
                    fieldState.error?.message !== commentFormMessages.isEmpty,
                  render: (
                    <span className="text-danger">
                      {commentFormMessages.isEmpty}
                    </span>
                  ),
                },
              ]}
            />
          </div>
        )
      }}
    />
  )
}

export default CommentInputController
