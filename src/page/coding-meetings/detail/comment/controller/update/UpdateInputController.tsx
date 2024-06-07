"use client"

import { CommentUpdateFormData } from "@/interfaces/form"
import { Control, useController } from "react-hook-form"
import {
  commentFormMessages,
  commentLengthLimit,
  commentRules,
} from "../../rules/commentRules"
import TextCounter from "@/components/shared/TextCounter"
import { twMerge } from "tailwind-merge"
import { useRecoilValue } from "recoil"
import { codingMeetingEditCommentAtom } from "@/recoil/atoms/coding-meeting/comment"
import { CodingMeetingComment } from "@/interfaces/coding-meetings"
import AutoResizeTextArea from "@/components/shared/textarea/AutoResizeTextArea"

interface UpdateInputControllerProps {
  control: Control<CommentUpdateFormData, any>
  comment: CodingMeetingComment
}

function UpdateInputController({
  control,
  comment,
}: UpdateInputControllerProps) {
  const { field } = useController({
    control,
    name: "commentForUpdate",
    rules: commentRules("update"),
  })

  const codingMeetingEditComment = useRecoilValue(codingMeetingEditCommentAtom)

  const editingCommentToken = codingMeetingEditComment.editingCommentToken
  const isEditTargetComment = !editingCommentToken
    ? false
    : editingCommentToken === comment.coding_meeting_comment_token

  const textareaWrapperClassNames = twMerge([
    isEditTargetComment
      ? "relative z-[2]"
      : "absolute left-0 top-0 w-full z-[-1] pointer-events-none",
  ])

  const textareaClassNames = twMerge([
    "resize-none outline-none border border-[#828282] p-1 rounded-lg",
    isEditTargetComment ? "opacity-100" : "opacity-0 pointer-events-none",
  ])

  return (
    <>
      <div className={textareaWrapperClassNames}>
        <AutoResizeTextArea
          ref={field.ref}
          name={field.name}
          className={textareaClassNames}
          fullWidth
          minRows={1}
          maxRows={22}
          value={field.value}
          onChange={field.onChange}
        />
      </div>
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
            valid: field.value.length === 0 || field.value.trim().length > 0,
            render: (
              <span className="text-danger">{commentFormMessages.isEmpty}</span>
            ),
          },
        ]}
      />
    </>
  )
}

export default UpdateInputController
