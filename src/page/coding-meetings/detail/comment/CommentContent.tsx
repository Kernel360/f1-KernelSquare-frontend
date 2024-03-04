"use client"

import { codingMeetingEditCommentAtom } from "@/recoil/atoms/coding-meeting/comment"
import { useRecoilValue } from "recoil"
import { CodingMeetingComment } from "@/interfaces/coding-meetings"
import { twMerge } from "tailwind-merge"
import { ForwardedRef, forwardRef } from "react"
import TextLengthIndicator from "./TextLengthIndicator"

interface CommentContentProps {
  comment: CodingMeetingComment
}

function CommentContent(
  { comment }: CommentContentProps,
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
      : "whitespace-pre-line opacity-100 pointer-events-auto",
  ])
  const textareaClassNames = twMerge([
    "w-full resize-none outline-none",
    isEditTargetComment
      ? "opacity-100 z-[2] border border-[#828282] rounded-lg"
      : "hidden",
  ])

  return (
    <div className="relative mt-4">
      <div className={justContentareaClassNames}>
        {comment.coding_meeting_comment_content}
      </div>
      <textarea
        ref={ref}
        className={textareaClassNames}
        defaultValue={comment.coding_meeting_comment_content}
      />
      <TextLengthIndicator
        text={(ref as React.RefObject<HTMLTextAreaElement>).current?.value}
        isEditTarget={
          codingMeetingEditComment.editingCommentToken ===
          comment.coding_meeting_comment_token
        }
      />
    </div>
  )
}

export default forwardRef<HTMLTextAreaElement, CommentContentProps>(
  CommentContent,
)
