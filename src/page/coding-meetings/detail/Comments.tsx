"use client"

import CreateAnswerAnime from "@/components/shared/animation/CreateAnswerAnime"
import LightBulb from "@/components/shared/animation/LightBulb"
import Button from "@/components/shared/button/Button"
import { useClientSession } from "@/hooks/useClientSession"
import {
  CodingMeetingAuthor,
  CodingMeetingComment,
  CodingMeetingCommentAuthor,
} from "@/interfaces/coding-meetings"
import { GetCodingMeetingCommentListPayload } from "@/interfaces/dto/coding-meeting/comment/get-coding-meeting-comment-list.dto"
import {
  createCodingMeetingComment,
  deleteCodingMeetingComment,
  getCodingMeetingComments,
  updateCodingMeetingComment,
} from "@/service/coding-meetings"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { FieldErrors, useForm } from "react-hook-form"
import { twMerge } from "tailwind-merge"
import UserInfo from "./UserInfo"
import { getKorRelativeTime } from "@/util/getDate"
import dayjs from "dayjs"
import Skeleton from "react-loading-skeleton"
import { toast } from "react-toastify"
import { AxiosError, HttpStatusCode } from "axios"
import { APIResponse } from "@/interfaces/dto/api-response"
import { revalidatePage } from "@/util/actions/revalidatePage"
import { RxDividerVertical } from "react-icons/rx"
import { useRef, useState } from "react"
import { FaRegCommentDots } from "react-icons/fa"
import useModal from "@/hooks/useModal"
import LoginForm from "@/components/form/LoginForm"

interface DetailCommentsProps {
  author: CodingMeetingAuthor
  token: string
}

interface CommentFormData {
  comment: string
}

function DetailComments({ author, token }: DetailCommentsProps) {
  const { user } = useClientSession()

  const queryClient = useQueryClient()

  const {
    data: comments,
    status,
    error,
  } = useQuery({
    queryKey: ["coding-meeting", "comment", token],
    queryFn: () => getCodingMeetingComments({ coding_meeting_token: token }),
    select(response) {
      return response.data.data
    },
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CommentFormData>()

  const onSubmit = async ({ comment }: CommentFormData) => {
    if (!user || isSubmitting) return

    try {
      await createCodingMeetingComment({
        coding_meeting_token: token,
        coding_meeting_comment_content: comment,
      })

      toast.success("댓글 생성에 성공하였습니다.", { position: "top-center" })

      queryClient.invalidateQueries({
        queryKey: ["coding-meeting", "comment", token],
      })
    } catch (error) {
      const toastId = "commentError"

      if (error instanceof AxiosError) {
        const { response } = error as AxiosError<APIResponse>

        if (response?.status === HttpStatusCode.Unauthorized) {
          toast.error("로그인후 댓글 생성이 가능합니다.", {
            position: "top-center",
            toastId,
          })

          revalidatePage("/coding-meetings/[token]", "page")

          return
        }

        toast.error(response?.data.msg ?? "댓글 생성에 실패했습니다.", {
          position: "top-center",
          toastId,
        })

        return
      }
    }
  }

  const onInvalid = (errors: FieldErrors<CommentFormData>) => {
    const toastId = "commentError"

    if (errors.comment?.type === "required") {
      toast.error("댓글을 작성해주세요.", { position: "top-center", toastId })
      return
    }

    if (errors.comment?.type === "maxLength") {
      toast.error("댓글은 최대 10000자까지 작성가능합니다.", {
        position: "top-center",
        toastId,
      })
      return
    }
  }

  return (
    <div>
      <div className="text-xl mb-6">
        <span className="font-bold">댓글</span>
        <span>&nbsp;</span>
        <span>
          {error
            ? "(0)"
            : status === "pending"
            ? ""
            : `(${comments?.length})` ?? "(0)"}
        </span>
      </div>
      <Info />
      {status === "pending" ? (
        <Skeleton className="w-full rounded-lg h-[342px]" />
      ) : (
        <>
          <form
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            className="w-full flex flex-wrap justify-center items-center gap-4 mb-[22px]"
          >
            <input
              {...register("comment", { required: true, maxLength: 10000 })}
              className="box-border flex-1 px-4 py-3 placeholder:text-[#BDBDBD] border border-[#E0E0E0] rounded-lg"
              placeholder="댓글을 입력해주세요"
              autoComplete="off"
            />
            <Button
              disabled={!user || isSubmitting}
              type="submit"
              buttonTheme="primary"
              className="w-[87px] h-[49px] disabled:bg-colorsGray disabled:text-colorsDarkGray"
            >
              <div className="flex justify-center items-center flex-shrink-0 gap-1">
                <FaRegCommentDots className="text-white flex-shrink-0" />
                <span className="text-white text-sm">댓글 작성</span>
              </div>
            </Button>
          </form>
          <div>
            <CommentList author={author} comments={comments ?? []} />
          </div>
        </>
      )}
    </div>
  )
}

export default DetailComments

function Info() {
  const { user } = useClientSession()
  const { openModal } = useModal()

  if (user) return null

  return (
    <div className="box-border flex flex-col h-[342px] tablet:h-auto tablet:flex-row justify-between items-center px-[34px] py-6 tablet:py-0 mb-7 border border-[#E0E0E0] rounded-lg">
      <div className="flex flex-col items-center tablet:flex-row gap-6">
        <div className="w-[200px] min-h-[173px] tablet:w-[120px] tablet:min-h-[104px]">
          <CreateAnswerAnime />
        </div>
        <span className="text-primary font-bold">
          로그인 하고 댓글을 남겨보세요!
        </span>
      </div>
      <Button
        className="px-6 py-4"
        buttonTheme="primary"
        onClick={() => {
          openModal({
            content: <LoginForm />,
          })
        }}
      >
        로그인 하기
      </Button>
    </div>
  )
}

function CommentList({
  author,
  comments,
}: {
  author: CodingMeetingAuthor
  comments: GetCodingMeetingCommentListPayload
}) {
  const wrapperClassNames = (type: "noComments" | "comments") => {
    const classNames = twMerge([
      type === "noComments" &&
        "w-full border border-[#E0E0E0] rounded-lg flex flex-col gap-6 justify-center items-center py-6",
      type === "comments" && "",
    ])

    return classNames
  }

  const now = dayjs().format()

  if (!comments.length) {
    return (
      <div className={wrapperClassNames("noComments")}>
        <div className="w-[180px] min-h-[160px]">
          <LightBulb />
        </div>
        <div className="flex flex-col items-center text-sm text-[#828282]">
          <span>아직 작성된 댓글이 존재하지 않습니다.</span>
          <span>첫 번째 댓글의 주인공이 되어보세요!</span>
        </div>
      </div>
    )
  }

  return (
    <ul className={wrapperClassNames("comments")}>
      {comments.map((comment) => {
        const commentAuthor: CodingMeetingCommentAuthor = {
          member_id: comment.member_id,
          member_nickname: comment.member_nickname,
          member_profile_url: comment.member_profile_url,
          member_level: comment.member_level,
          member_level_image_url: comment.member_level_image_url,
        }

        return (
          <Comment
            key={comment.coding_meeting_comment_token}
            now={now}
            author={author}
            comment={comment}
          />
        )
      })}
    </ul>
  )
}

function Comment({
  now,
  author,
  comment,
}: {
  now: string
  author: CodingMeetingAuthor
  comment: CodingMeetingComment
}) {
  const { user } = useClientSession()

  const queryClient = useQueryClient()

  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const [isCommentEditing, setIsCommentEditing] = useState(false)

  const { mutate: updateComment, status: updateCommentStatus } = useMutation({
    mutationFn: (content: string) =>
      updateCodingMeetingComment({
        coding_meeting_comment_token: comment.coding_meeting_comment_token,
        coding_meeting_comment_content: content,
      }),
    onSuccess() {
      setIsCommentEditing(false)

      queryClient.invalidateQueries({
        queryKey: ["coding-meeting", "comment"],
      })
    },
    onError(error) {
      toast.error("댓글 수정 실패", {
        position: "top-center",
        toastId: "updateCommentFail",
      })
    },
  })

  const { mutate: deleteComment, status: deleteCommentStatus } = useMutation({
    mutationFn: () =>
      deleteCodingMeetingComment({
        coding_meeting_comment_token: comment.coding_meeting_comment_token,
      }),
    onSuccess() {
      setIsCommentEditing(false)

      queryClient.invalidateQueries({
        queryKey: ["coding-meeting", "comment"],
      })
    },
    onError(error) {
      toast.error("댓글 삭제 실패", {
        position: "top-center",
        toastId: "updateCommentFail",
      })
    },
  })

  const commentAuthor: CodingMeetingCommentAuthor = {
    member_id: comment.member_id,
    member_nickname: comment.member_nickname,
    member_profile_url: comment.member_profile_url,
    member_level: comment.member_level,
    member_level_image_url: comment.member_level_image_url,
  }

  const validateContent = (content: string) => {
    const toastId = "updateCommentError"

    if (!content.length) {
      toast.error("내용을 입력해주세요", { position: "top-center", toastId })

      return false
    }

    if (content.length > 10000) {
      toast.error("내용은 최대 10000자까지 입력가능합니다", {
        position: "top-center",
        toastId,
      })

      return false
    }

    return true
  }

  const onSubmit = (type: "update" | "delete") => {
    const value = textAreaRef.current?.value ?? ""

    if (type === "update") {
      if (!validateContent(value)) return

      updateComment(value)

      return
    }

    deleteComment()
  }

  const isAuthor = author.member_nickname === comment.member_nickname
  const isCommentAuthor = user?.nickname === commentAuthor.member_nickname

  return (
    <li className="w-full flex flex-col box-border px-6 py-6 pb-[34px]">
      <div className="w-full flex justify-between items-center flex-wrap">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex gap-2 items-center flex-shrink-0">
            <UserInfo user={commentAuthor} />
            {isAuthor ? (
              <div className="flex-shrink-0 bg-primary text-xs text-white flex justify-center items-center px-2 py-1 rounded-lg">
                작성자
              </div>
            ) : null}
          </div>
          <div className="text-[#828282] text-sm flex-shrink-0">
            <span>답변일시 : </span>
            <span>
              {getKorRelativeTime({
                now,
                targetDate: comment.created_date,
              })}
            </span>
          </div>
        </div>
        {isCommentAuthor && (
          <div className="flex text-sm font-semibold items-center">
            {isCommentEditing ? (
              <>
                <Button
                  className="px-4 py-2 text-[#828282] shrink-0 disabled:bg-colorsGray"
                  disabled={
                    updateCommentStatus === "pending" ||
                    deleteCommentStatus === "pending"
                  }
                  onClick={() => onSubmit("update")}
                >
                  수정
                </Button>
                <RxDividerVertical className="text-[#E0E0E0] shrink-0" />
                <Button
                  className="px-4 py-2 text-[#EB5757] shrink-0 disabled:bg-colorsGray"
                  onClick={() => {
                    setIsCommentEditing(false)

                    if (textAreaRef.current) {
                      textAreaRef.current.value =
                        comment.coding_meeting_comment_content
                    }
                  }}
                  disabled={
                    updateCommentStatus === "pending" ||
                    deleteCommentStatus === "pending"
                  }
                >
                  취소하기
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="px-4 py-2 text-[#828282] shrink-0"
                  onClick={() => setIsCommentEditing(true)}
                >
                  수정하기
                </Button>
                <RxDividerVertical className="text-[#E0E0E0] shrink-0" />
                <Button
                  className="px-4 py-2 text-[#EB5757] shrink-0"
                  onClick={() => onSubmit("delete")}
                >
                  삭제하기
                </Button>
              </>
            )}
          </div>
        )}
      </div>
      <div className="relative mt-4">
        <div
          className={`${
            isCommentEditing ? "hidden" : "opacity-100 pointer-events-auto"
          }`}
        >
          {comment.coding_meeting_comment_content}
        </div>
        <textarea
          ref={textAreaRef}
          className={`w-full resize-none ${
            isCommentEditing
              ? "opacity-100 z-[2] border border-[#828282] rounded-lg"
              : "hidden"
          }`}
          defaultValue={comment.coding_meeting_comment_content}
        />
      </div>
    </li>
  )
}
