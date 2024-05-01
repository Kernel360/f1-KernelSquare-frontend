"use client"

import { CommentUpdateFormData } from "@/interfaces/form"
import { Control, Controller } from "react-hook-form"
import {
  commentFormMessages,
  commentLengthLimit,
  commentRules,
} from "../../rules/commentRules"
import TextCounter from "@/components/shared/TextCounter"
import { twMerge } from "tailwind-merge"
import { useRecoilState } from "recoil"
import { codingMeetingEditCommentAtom } from "@/recoil/atoms/coding-meeting/comment"
import { CodingMeetingComment } from "@/interfaces/coding-meetings"

interface UpdateInputControllerProps {
  control: Control<CommentUpdateFormData, any>
  comment: CodingMeetingComment
}

function UpdateInputController({
  control,
  comment,
}: UpdateInputControllerProps) {
  const [codingMeetingEditComment, setCodingMeetingEditComment] =
    useRecoilState(codingMeetingEditCommentAtom)

  const editingCommentToken = codingMeetingEditComment.editingCommentToken
  const isEditTargetComment = !editingCommentToken
    ? false
    : editingCommentToken === comment.coding_meeting_comment_token

  const textareaClassNames = twMerge([
    "w-full resize-none outline-none",
    isEditTargetComment
      ? "opacity-100 z-[2] border border-[#828282] rounded-lg"
      : "hidden",
  ])

  return (
    <Controller
      control={control}
      name="commentForUpdate"
      defaultValue={comment.coding_meeting_comment_content}
      rules={commentRules("update")}
      render={({ field, fieldState }) => {
        return (
          <>
            <textarea
              ref={field.ref}
              name={field.name}
              className={textareaClassNames}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
            <TextCounter
              min={commentLengthLimit.min}
              max={commentLengthLimit.max}
              text={field.value}
              target={
                codingMeetingEditComment.editingCommentToken ===
                comment.coding_meeting_comment_token
              }
              externalValidations={[
                {
                  valid:
                    field.value.length === 0 || field.value.trim().length > 0,
                  render: (
                    <span className="text-danger">
                      {commentFormMessages.isEmpty}
                    </span>
                  ),
                },
              ]}
            />
          </>
        )
      }}
    />
  )
}

export default UpdateInputController
