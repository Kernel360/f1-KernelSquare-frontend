"use client"

import { codingMeetingEditCommentAtom } from "@/recoil/atoms/coding-meeting/comment"
import { useRecoilState } from "recoil"
import { CodingMeetingComment } from "@/interfaces/coding-meetings"
import { twMerge } from "tailwind-merge"
import { ForwardedRef, forwardRef } from "react"
import TextCounter from "@/components/shared/TextCounter"
import { commentFormMessages, commentLengthLimit } from "./Comments"
import Truncate from "@/components/shared/Truncate"
import Button from "@/components/shared/button/Button"
import { IoIosArrowUp } from "react-icons/io"

interface CommentContentProps {
  comment: CodingMeetingComment
}

function CommentContent(
  { comment }: CommentContentProps,
  ref: ForwardedRef<HTMLTextAreaElement>,
) {
  const [codingMeetingEditComment, setCodingMeetionEditComment] =
    useRecoilState(codingMeetingEditCommentAtom)

  const editingCommentToken = codingMeetingEditComment.editingCommentToken
  const isEditTargetComment = !editingCommentToken
    ? false
    : editingCommentToken === comment.coding_meeting_comment_token

  const justContentareaClassNames = twMerge([
    isEditTargetComment
      ? "hidden"
      : "whitespace-pre-wrap opacity-100 pointer-events-auto",
  ])
  const textareaClassNames = twMerge([
    "w-full resize-none outline-none",
    isEditTargetComment
      ? "opacity-100 z-[2] border border-[#828282] rounded-lg"
      : "hidden",
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
      <textarea
        ref={ref}
        className={textareaClassNames}
        onChange={(e) =>
          setCodingMeetionEditComment((prev) => ({
            ...prev,
            comment: e.currentTarget.value,
          }))
        }
        defaultValue={comment.coding_meeting_comment_content}
      />
      <TextCounter
        min={commentLengthLimit.min}
        max={commentLengthLimit.max}
        text={codingMeetingEditComment.comment}
        target={
          codingMeetingEditComment.editingCommentToken ===
          comment.coding_meeting_comment_token
        }
        externalValidations={[
          {
            valid:
              codingMeetingEditComment.comment?.length === 0 ||
              codingMeetingEditComment.comment.trim().length > 0,
            render: (
              <span className="text-danger">{commentFormMessages.isEmpty}</span>
            ),
          },
        ]}
      />
    </div>
  )
}

export default forwardRef<HTMLTextAreaElement, CommentContentProps>(
  CommentContent,
)
