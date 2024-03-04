"use client"

import Button from "@/components/shared/button/Button"
import { useCommentMutation } from "@/hooks/coding-meeting/useCommentMutation"
import { useClientSession } from "@/hooks/useClientSession"
import {
  CodingMeetingComment,
  CodingMeetingCommentAuthor,
} from "@/interfaces/coding-meetings"
import { codingMeetingEditCommentAtom } from "@/recoil/atoms/coding-meeting/comment"
import { RxDividerVertical } from "react-icons/rx"
import { toast } from "react-toastify"
import { useRecoilState, useResetRecoilState } from "recoil"
import { commentFormMessages } from "./Comments"
import { twMerge } from "tailwind-merge"

interface CommentControlProps {
  comment: CodingMeetingComment
  textarea: HTMLTextAreaElement | null
}

function CommentControl({ comment, textarea }: CommentControlProps) {
  const { user } = useClientSession()

  const [codingMeetingEditComment, setCodingMeetingEditComment] =
    useRecoilState(codingMeetingEditCommentAtom)

  const resetCodingMeetingEditComment = useResetRecoilState(
    codingMeetingEditCommentAtom,
  )

  const {
    updateComment,
    updateCommentStatus,
    deleteComment,
    deleteCommentStatus,
    validateComment,
  } = useCommentMutation()

  const onSubmit = () => {
    const errors = validateComment(textarea?.value ?? "")

    const toastId = "updateCommentError"

    if (errors) {
      const {
        comment: { type: errorType },
      } = errors

      if (errorType === "required") {
        toast.error(commentFormMessages.required, {
          position: "top-center",
          toastId,
        })
        return
      }

      if (errorType === "minLength") {
        toast.error(commentFormMessages.minLength, {
          position: "top-center",
          toastId,
        })
        return
      }

      if (errorType === "maxLength") {
        toast.error(commentFormMessages.maxLength, {
          position: "top-center",
          toastId,
        })
        return
      }

      return
    }

    if (textarea?.value === comment.coding_meeting_comment_content) {
      toast.error(commentFormMessages.isEqual, {
        position: "top-center",
        toastId,
      })

      return
    }

    updateComment({
      commentToken: comment.coding_meeting_comment_token,
      content: textarea?.value ?? "",
    })
  }

  const disableCase =
    updateCommentStatus === "pending" ||
    deleteCommentStatus === "pending" ||
    (!!codingMeetingEditComment.editingCommentToken &&
      codingMeetingEditComment.editingCommentToken !==
        comment.coding_meeting_comment_token)

  const commentAuthor: CodingMeetingCommentAuthor = {
    member_id: comment.member_id,
    member_nickname: comment.member_nickname,
    member_profile_url: comment.member_profile_url,
    member_level: comment.member_level,
    member_level_image_url: comment.member_level_image_url,
  }

  const isCommentAuthor = user?.nickname === commentAuthor.member_nickname
  const isEditTarget =
    !!codingMeetingEditComment.editingCommentToken &&
    codingMeetingEditComment.editingCommentToken ===
      comment.coding_meeting_comment_token

  if (!isCommentAuthor) return null

  if (!codingMeetingEditComment.editingCommentToken || !isEditTarget) {
    return (
      <CommentControlWrapper
        isEditing={!!codingMeetingEditComment.editingCommentToken}
        isEditTarget={isEditTarget}
      >
        <Button
          className="px-4 py-2 text-[#828282] shrink-0"
          disabled={disableCase}
          onClick={() => {
            setCodingMeetingEditComment((prev) => ({
              ...prev,
              editingCommentToken: comment.coding_meeting_comment_token,
              comment: comment.coding_meeting_comment_content,
            }))
          }}
        >
          수정하기
        </Button>
        <RxDividerVertical className="text-[#E0E0E0] shrink-0" />
        <Button
          className="px-4 py-2 text-[#EB5757] shrink-0"
          disabled={disableCase}
          onClick={() =>
            deleteComment({
              commentToken: comment.coding_meeting_comment_token,
            })
          }
        >
          삭제하기
        </Button>
      </CommentControlWrapper>
    )
  }

  return (
    <CommentControlWrapper
      isEditing={!!codingMeetingEditComment.editingCommentToken}
      isEditTarget={isEditTarget}
    >
      <Button
        className="px-4 py-2 text-[#828282] shrink-0 disabled:bg-colorsLightGray"
        disabled={disableCase}
        onClick={onSubmit}
      >
        수정
      </Button>
      <RxDividerVertical className="text-[#E0E0E0] shrink-0" />
      <Button
        className="px-4 py-2 text-[#EB5757] shrink-0 disabled:bg-colorsLightGray"
        onClick={(e) => {
          resetCodingMeetingEditComment()

          if (textarea) textarea.value = comment.coding_meeting_comment_content

          e.currentTarget.blur()
        }}
        disabled={disableCase}
      >
        취소하기
      </Button>
    </CommentControlWrapper>
  )
}

export default CommentControl

function CommentControlWrapper({
  children,
  isEditing,
  isEditTarget,
}: {
  isEditTarget: boolean
  isEditing: boolean
  children: React.ReactNode
}) {
  const classNames = twMerge(
    "flex text-sm font-semibold items-center transition-opacity duration-300",
    isEditing && !isEditTarget
      ? "opacity-0 pointer-events-none"
      : "opacity-100 pointer-events-auto",
  )

  return <div className={classNames}>{children}</div>
}
