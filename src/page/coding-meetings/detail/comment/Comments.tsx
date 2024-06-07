"use client"

import CreateAnswerAnime from "@/components/shared/animation/CreateAnswerAnime"
import LightBulb from "@/components/shared/animation/LightBulb"
import { Button } from "@/components/ui/button"
import { useClientSession } from "@/hooks/useClientSession"
import {
  CodingMeetingAuthor,
  CodingMeetingComment,
} from "@/interfaces/coding-meetings"
import { GetCodingMeetingCommentListPayload } from "@/interfaces/dto/coding-meeting/comment/get-coding-meeting-comment-list.dto"
import { getCodingMeetingComments } from "@/service/coding-meetings"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { twMerge } from "tailwind-merge"
import { getKorRelativeTime } from "@/util/getDate"
import dayjs from "dayjs"
import Skeleton from "react-loading-skeleton"
import { useEffect, useMemo, useRef, useState, memo } from "react"
import useModal from "@/hooks/useModal"
import LoginForm from "@/components/form/LoginForm"
import CommentControl from "./CommentControl"
import CommentContent from "./CommentContent"
import UserInfo, { UserProfileInfo } from "@/components/shared/user/UserInfo"
import CommentsFilter from "./CommentsFilter"
import {
  CodingMeetingCommentsFilterOption,
  getCodingMeetingCommentsFilter,
  sortCodingMeetingComments,
} from "@/util/filter/coding-meeting-comments"
import CommentInputController from "./controller/create/CommentInputController"
import { CommentFormData, CommentUpdateFormData } from "@/interfaces/form"
import {
  CreateCommentErrorCallback,
  CreateCommentInvalidCallback,
  CreateCommentSuccessCallback,
} from "./SubmitButton"
import { commentFormMessages } from "./rules/commentRules"
import { toast } from "react-toastify"
import { AxiosError, HttpStatusCode } from "axios"
import { APIResponse } from "@/interfaces/dto/api-response"
import { revalidatePage } from "@/util/actions/revalidatePage"

interface DetailCommentsProps {
  author: CodingMeetingAuthor
  token: string
}

function DetailComments({ author, token }: DetailCommentsProps) {
  const { clientSessionReset } = useClientSession()
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

  const { control, setValue, formState } = useForm<CommentFormData>()

  const commentData = useMemo(() => {
    return {
      comments: comments ?? [],
      now: dayjs().format(),
    }
  }, [comments])

  const onSubmitSuccess: CreateCommentSuccessCallback = () => {
    setValue("comment", "")

    toast.success("댓글 생성에 성공하였습니다.", { position: "top-center" })

    queryClient.invalidateQueries({
      queryKey: ["coding-meeting", "comment", token],
    })
  }

  const onSubmitError: CreateCommentErrorCallback = (error) => {
    const toastId = "commentError"

    if (error instanceof AxiosError) {
      const { response } = error as AxiosError<APIResponse>

      if (response?.status === HttpStatusCode.Unauthorized) {
        toast.error("로그인후 댓글 생성이 가능합니다.", {
          position: "top-center",
          toastId,
        })

        setValue("comment", "")
        clientSessionReset()

        revalidatePage("/coding-meetings/[token]", "page")

        return
      }

      toast.error(
        response?.data.msg
          ? response.data.msg.split(" : ")[1]
          : "댓글 생성에 실패했습니다.",
        {
          position: "top-center",
          toastId,
        },
      )
    }
  }

  const onInvalid: CreateCommentInvalidCallback = (errors) => {
    const toastId = "commentError"

    if (errors.comment?.type === "required") {
      toast.error(commentFormMessages.required, {
        position: "top-center",
        toastId,
      })
      return
    }

    if (errors.comment?.type === "validate") {
      toast.error(errors.comment.message, {
        position: "top-center",
        toastId,
      })
      return
    }

    if (errors.comment?.type === "maxLength") {
      toast.error(errors.comment.message, {
        position: "top-center",
        toastId,
      })
      return
    }
  }

  return (
    <div>
      <div className="flex gap-1 justify-between items-center mb-6">
        <div className="text-xl">
          <span className="font-bold">댓글</span>
          <span>&nbsp;</span>
          <span>
            {error
              ? "(0)"
              : status === "pending"
              ? ""
              : `(${comments?.length ?? 0})`}
          </span>
        </div>
        <CommentsFilter />
      </div>
      <Info />
      {status === "pending" ? (
        <Skeleton className="w-full rounded-lg h-[342px]" />
      ) : (
        <>
          <form className="relative w-full mb-[22px]">
            <CommentInputController
              control={control}
              formState={formState}
              token={token}
              onSubmitSuccess={onSubmitSuccess}
              onSubmitError={onSubmitError}
              onInvalid={onInvalid}
            />
          </form>
          <div>
            <CommentList
              author={author}
              comments={commentData.comments}
              now={commentData.now}
            />
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

const CommentList = memo(function CommentLists({
  author,
  comments,
  now,
}: {
  author: CodingMeetingAuthor
  comments: GetCodingMeetingCommentListPayload
  now: string
}) {
  const [filter, setFilter] = useState<CodingMeetingCommentsFilterOption>(
    getCodingMeetingCommentsFilter(),
  )

  const wrapperClassNames = (type: "noComments" | "comments") => {
    const classNames = twMerge([
      type === "noComments" &&
        "w-full border border-[#E0E0E0] rounded-lg flex flex-col gap-6 justify-center items-center py-6",
      type === "comments" && "",
    ])

    return classNames
  }

  useEffect(() => {
    const handleStorageEvent = (e: StorageEvent) => {
      setFilter(getCodingMeetingCommentsFilter())
    }

    window.addEventListener("storage", handleStorageEvent)

    return () => {
      window.removeEventListener("storage", handleStorageEvent)
    }
  }, [])

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
      {sortCodingMeetingComments({
        comments: comments ?? [],
        orderBy: filter,
      }).map((comment) => {
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
})

function Comment({
  now,
  author,
  comment,
}: {
  now: string
  author: CodingMeetingAuthor
  comment: CodingMeetingComment
}) {
  const { control } = useForm<CommentUpdateFormData>({
    defaultValues: {
      commentForUpdate: comment.coding_meeting_comment_content,
    },
  })

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const commentAuthor: UserProfileInfo = {
    id: comment.member_id,
    nickname: comment.member_nickname,
    profileImageUrl: comment.member_profile_url,
    level: comment.member_level,
    levelImageUrl: comment.member_level_image_url,
  }

  const isAuthor = author.member_nickname === comment.member_nickname

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
        <CommentControl comment={comment} control={control} />
      </div>
      <CommentContent ref={textareaRef} control={control} comment={comment} />
    </li>
  )
}
