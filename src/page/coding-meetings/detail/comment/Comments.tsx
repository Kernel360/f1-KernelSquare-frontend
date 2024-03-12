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
import {
  createCodingMeetingComment,
  getCodingMeetingComments,
} from "@/service/coding-meetings"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { FieldErrors, useForm } from "react-hook-form"
import { twMerge } from "tailwind-merge"
import { getKorRelativeTime } from "@/util/getDate"
import dayjs from "dayjs"
import Skeleton from "react-loading-skeleton"
import { toast } from "react-toastify"
import { AxiosError, HttpStatusCode } from "axios"
import { APIResponse } from "@/interfaces/dto/api-response"
import { revalidatePage } from "@/util/actions/revalidatePage"
import { useEffect, useRef, useState } from "react"
import { FaRegCommentDots } from "react-icons/fa"
import useModal from "@/hooks/useModal"
import LoginForm from "@/components/form/LoginForm"
import CommentControl from "./CommentControl"
import CommentContent from "./CommentContent"
import { useRecoilValue } from "recoil"
import { codingMeetingEditCommentAtom } from "@/recoil/atoms/coding-meeting/comment"
import TextCounter from "@/components/shared/TextCounter"
import UserInfo, { UserProfileInfo } from "@/components/shared/user/UserInfo"
import CommentsFilter from "./CommentsFilter"
import {
  CodingMeetingCommentsFilterOption,
  getCodingMeetingCommentsFilter,
  sortCodingMeetingComments,
} from "@/util/filter/coding-meeting-comments"

interface DetailCommentsProps {
  author: CodingMeetingAuthor
  token: string
}

interface CommentFormData {
  comment: string
}

export interface CommentUpdateFormData {
  commentForUpdate: string
}

export const commentFormMessages = {
  required: "댓글을 작성해주세요.",
  maxLength: "댓글은 최대 300자까지 작성가능합니다.",
  isEqual: "댓글 내용이 이전과 동일합니다.",
  isEmpty: "댓글에는 공백만 입력할 수 없습니다.",
}

export const commentLengthLimit = {
  min: 1,
  max: 300,
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

  const [filter, setFilter] = useState<CodingMeetingCommentsFilterOption>(
    getCodingMeetingCommentsFilter(),
  )

  const codingMeetingEditComment = useRecoilValue(codingMeetingEditCommentAtom)
  const isCommentEditing = !!codingMeetingEditComment.editingCommentToken

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { isSubmitting, isValid, errors },
  } = useForm<CommentFormData>()

  const formRef = useRef<HTMLFormElement>(null)
  const submitBtnRef = useRef<HTMLButtonElement>(null)

  const disableCase = {
    input: !user || isSubmitting || isCommentEditing,
    button: !user || !isValid || isSubmitting || isCommentEditing,
  }

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

      setValue("comment", "")
      trigger("comment")
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

        toast.error(
          response?.data.msg
            ? response.data.msg.split(" : ")[1]
            : "댓글 생성에 실패했습니다.",
          {
            position: "top-center",
            toastId,
          },
        )

        return
      }
    }
  }

  const onInvalid = (errors: FieldErrors<CommentFormData>) => {
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

  const onSubmitButtonClick = () => {
    formRef.current?.requestSubmit()
  }

  /*
    - 개발자 도구에서 disabled 를 강제로 풀고
    클릭시에도 토스트 팝업이 나오도록 하기 위함,
    - 이벤트 버블링을 활용하여 수동으로 검사(trigger)하는 것을 
    통해 react hook form 의 validation이 반영될 수있도록 함
  */
  const onFormClickBubble = async (e: React.FormEvent<HTMLFormElement>) => {
    const closestButton = (e.target as HTMLElement).closest("button")
    if (!closestButton || closestButton !== submitBtnRef.current) return

    if (isValid) return

    await trigger("comment")
    onInvalid(errors)
  }

  const validateEmpty = (value: string) => {
    if (value.length && value.trim().length !== 0) return true

    return commentFormMessages.isEmpty
  }

  useEffect(() => {
    const handleStorageEvent = (e: StorageEvent) => {
      console.log("storage change", { order: getCodingMeetingCommentsFilter() })
      setFilter(getCodingMeetingCommentsFilter())
    }

    window.addEventListener("storage", handleStorageEvent)

    return () => {
      window.removeEventListener("storage", handleStorageEvent)
    }
  }, [])

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
              : `(${comments?.length})` ?? "(0)"}
          </span>
        </div>
        <CommentsFilter />
      </div>
      <Info />
      {status === "pending" ? (
        <Skeleton className="w-full rounded-lg h-[342px]" />
      ) : (
        <>
          <form
            ref={formRef}
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            onClick={onFormClickBubble}
            className="relative w-full flex gap-4 justify-center items-center mb-[22px]"
          >
            <div className="w-full flex flex-col flex-1">
              <textarea
                {...register("comment", {
                  required: true,
                  maxLength: {
                    value: commentLengthLimit.max,
                    message: commentFormMessages.maxLength,
                  },
                  validate: validateEmpty,
                })}
                rows={1}
                disabled={disableCase.input}
                className="resize-none w-full box-border px-4 py-3 placeholder:text-[#BDBDBD] border border-[#E0E0E0] rounded-lg"
                placeholder={"댓글을 입력해주세요(300자 이하)"}
                autoComplete="off"
              />
            </div>
            <Button
              ref={submitBtnRef}
              disabled={disableCase.button}
              type="button"
              onClick={onSubmitButtonClick}
              className="w-[87px] h-[49px] disabled:bg-colorsGray disabled:text-colorsDarkGray"
            >
              <div className="flex justify-center items-center flex-shrink-0 gap-1">
                <FaRegCommentDots className="text-white flex-shrink-0" />
                <span className="text-white text-sm">댓글 작성</span>
              </div>
            </Button>
            <TextCounter
              className="absolute left-0 -bottom-6"
              min={commentLengthLimit.min}
              max={commentLengthLimit.max}
              text={watch("comment") ?? ""}
              target={!isCommentEditing && !!watch("comment")}
              externalValidations={[
                {
                  valid: watch("comment")?.trim().length !== 0,
                  render: (
                    <span className="text-danger">
                      {commentFormMessages.isEmpty}
                    </span>
                  ),
                },
              ]}
            />
          </form>
          <div>
            <CommentList
              author={author}
              comments={sortCodingMeetingComments({
                comments: comments ?? [],
                orderBy: filter,
              })}
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
        <CommentControl comment={comment} textarea={textareaRef.current} />
      </div>
      <CommentContent ref={textareaRef} comment={comment} />
    </li>
  )
}
