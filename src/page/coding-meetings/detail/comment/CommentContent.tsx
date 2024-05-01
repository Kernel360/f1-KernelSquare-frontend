"use client"

import { codingMeetingEditCommentAtom } from "@/recoil/atoms/coding-meeting/comment"
import { useRecoilState, useRecoilValue } from "recoil"
import { CodingMeetingComment } from "@/interfaces/coding-meetings"
import { twMerge } from "tailwind-merge"
import { ForwardedRef, forwardRef } from "react"
import Truncate from "@/components/shared/Truncate"
import Button from "@/components/shared/button/Button"
import { IoIosArrowUp } from "react-icons/io"
import UpdateInputController from "./controller/update/UpdateInputController"
import { Control } from "react-hook-form"
import { CommentUpdateFormData } from "@/interfaces/form"

interface CommentContentProps {
  control: Control<CommentUpdateFormData, any>
  comment: CodingMeetingComment
}

function CommentContent(
  { control, comment }: CommentContentProps,
  ref: ForwardedRef<HTMLTextAreaElement>,
) {
  const codingMeetingEditComment = useRecoilValue(codingMeetingEditCommentAtom)

  const editingCommentToken = codingMeetingEditComment.editingCommentToken
  const isEditTargetComment = !editingCommentToken
    ? false
    : editingCommentToken === comment.coding_meeting_comment_token

  const justContentareaClassNames = twMerge([
    isEditTargetComment
      ? "hidden"
      : "whitespace-pre-wrap opacity-100 pointer-events-auto",
  ])

  return (
    <div className="relative mt-4">
      <Truncate
        less={({ showLess }) => (
          <Button
            className="text-xs text-[#828282] font-medium gap-1"
            onClick={showLess}
          >
            <IoIosArrowUp className="text-sm" />
            댓글 접기
          </Button>
        )}
      >
        <div className={justContentareaClassNames}>
          {comment.coding_meeting_comment_content}
        </div>
      </Truncate>
      <UpdateInputController control={control} comment={comment} />
    </div>
  )
}

export default forwardRef<HTMLTextAreaElement, CommentContentProps>(
  CommentContent,
)
