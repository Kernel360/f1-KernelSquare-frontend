"use client"

import { APIResponse } from "@/interfaces/dto/api-response"
import { codingMeetingEditCommentAtom } from "@/recoil/atoms/coding-meeting/comment"
import {
  deleteCodingMeetingComment,
  updateCodingMeetingComment,
} from "@/service/coding-meetings"
import { revalidatePage } from "@/util/actions/revalidatePage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError, HttpStatusCode } from "axios"
import { toast } from "react-toastify"
import { useResetRecoilState } from "recoil"
import { useClientSession } from "../useClientSession"
import { commentLengthLimit } from "@/page/coding-meetings/detail/comment/Comments"

export function useCommentMutation() {
  const { clientSessionReset } = useClientSession()

  const resetCodingMeetingEditComment = useResetRecoilState(
    codingMeetingEditCommentAtom,
  )

  const queryClient = useQueryClient()

  const toastId = {
    update: {
      success: "updateCommentSuccess",
      apiError: "updateCommentFail",
      InternalError: "updateCommentError",
    },
    delete: {
      success: "deleteCommentSuccess",
      apiError: "deleteCommentFail",
      InternalError: "deleteCommentError",
    },
  }

  const { mutate: updateCommentMutation, status: updateCommentMutationStatus } =
    useMutation({
      mutationFn: ({
        commentToken,
        content,
      }: {
        commentToken: string
        content: string
      }) =>
        updateCodingMeetingComment({
          coding_meeting_comment_token: commentToken,
          coding_meeting_comment_content: content,
        }),
      onSuccess() {
        resetCodingMeetingEditComment()

        toast.success("댓글이 수정되었습니다.", {
          position: "top-center",
          toastId: toastId.update.success,
        })

        queryClient.invalidateQueries({
          queryKey: ["coding-meeting", "comment"],
        })
      },
      async onError(error) {
        if (error instanceof AxiosError) {
          const { response } = error as AxiosError<APIResponse>

          if (response?.status === HttpStatusCode.Unauthorized) {
            resetCodingMeetingEditComment()

            await clientSessionReset()
            revalidatePage("*")

            setTimeout(() => {
              toast.error("로그인 후 댓글 수정이 가능합니다.", {
                position: "top-center",
                toastId: toastId.update.apiError,
              })
            }, 0)

            return
          }
        }

        toast.error("댓글 수정 실패", {
          position: "top-center",
          toastId: toastId.update.InternalError,
        })
      },
    })

  const { mutate: deleteCommentMutation, status: deleteCommentMutationStatus } =
    useMutation({
      mutationFn: ({ commentToken }: { commentToken: string }) =>
        deleteCodingMeetingComment({
          coding_meeting_comment_token: commentToken,
        }),
      onSuccess() {
        resetCodingMeetingEditComment()

        toast.success("댓글을 삭제했습니다.", {
          position: "top-center",
          toastId: toastId.delete.success,
        })

        queryClient.invalidateQueries({
          queryKey: ["coding-meeting", "comment"],
        })
      },
      async onError(error) {
        if (error instanceof AxiosError) {
          const { response } = error as AxiosError<APIResponse>

          if (response?.status === HttpStatusCode.Unauthorized) {
            resetCodingMeetingEditComment()

            await clientSessionReset()
            revalidatePage("*")

            setTimeout(() => {
              toast.error("로그인 후 댓글 삭제가 가능합니다.", {
                position: "top-center",
                toastId: toastId.delete.apiError,
              })
            }, 0)

            return
          }
        }

        toast.error("댓글 삭제 실패", {
          position: "top-center",
          toastId: toastId.delete.InternalError,
        })
      },
    })

  const validateComment = (comment: string) => {
    if (!comment) {
      return {
        comment: {
          type: "required",
        },
      } as const
    }

    if (comment.length > commentLengthLimit.max) {
      return {
        comment: {
          type: "maxLength",
        },
      } as const
    }

    if (comment.length && comment.trim().length === 0) {
      return {
        comment: {
          type: "isEmpty",
        },
      } as const
    }

    return null
  }

  return {
    updateComment: updateCommentMutation,
    updateCommentStatus: updateCommentMutationStatus,
    deleteComment: deleteCommentMutation,
    deleteCommentStatus: deleteCommentMutationStatus,
    validateComment,
  }
}
