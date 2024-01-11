"use client"

import type { Answer } from "@/interfaces/answer"
import Image from "next/image"
import { getDate } from "@/util/getDate"
import { VoteIcons } from "@/components/icons/Icons"
import dynamic from "next/dynamic"
import { useEffect, useRef } from "react"
import Button from "@/components/shared/button/Button"
import { updateAnswer } from "@/service/answers"
import type { Editor } from "@toast-ui/react-editor"
import { useForm } from "react-hook-form"
import useQnADetail from "../../hooks/useQnADetail"
import { toast } from "react-toastify"
import { errorMessage } from "@/constants/message"
import useHandleMyAnswer from "../../hooks/useHandleMyAnswer"
import useAnswerVote from "../../hooks/useAnswerVote"
import { useClientSession } from "@/hooks/useClientSession"
import { useQueryClient } from "@tanstack/react-query"

const MdViewer = dynamic(() => import("../Markdown/MdViewer"), {
  ssr: false,
})

const MdEditor = dynamic(() => import("../Markdown/MdEditor"), {
  ssr: false,
})

interface OneAnswerProps {
  answer: Answer
  createdby: string | undefined
}

const OneAnswer: React.FC<OneAnswerProps> = ({ answer, createdby }) => {
  const { checkNullValue } = useQnADetail()
  const { user } = useClientSession()
  const queryClient = useQueryClient()

  const isEdited = answer.created_date !== answer.modified_date
  const isMyAnswer = createdby === answer.created_by

  const editorRef = useRef<Editor>(null)

  // 답변 투표
  const { vote, setVote } = useAnswerVote({
    answer,
    userId: user?.member_id,
  })

  useEffect(() => {
    setVote({ ...vote, value: answer.vote_count })
  }, [])

  // 답변 수정
  const { handleSubmit } = useForm()
  const { isAnswerEditMode, setIsAnswerEditMode, handleEditMode } =
    useHandleMyAnswer()

  const handleEditValue = async () => {
    const submitValue = editorRef.current?.getInstance().getMarkdown()
    console.log("md", submitValue)

    if (checkNullValue(submitValue)) {
      toast.error(errorMessage.noContent, {
        position: "top-center",
        autoClose: 1000,
      })
      return
    }

    try {
      const res = await updateAnswer({
        answerId: answer.answer_id,
        content: submitValue as string,
      })

      // console.log("res", res.data.msg, JSON.parse(res.config.data).content)

      answer.content = JSON.parse(res.config.data).content
      answer.image_url = JSON.parse(res.config.data).image_url
      queryClient.invalidateQueries({
        queryKey: ["answer", answer.question_id],
      })
    } catch (err) {
      console.error("error", err)
    }
    setIsAnswerEditMode(false)
  }

  const EditAnswerBox = () => {
    return (
      <form onSubmit={handleSubmit(handleEditValue)}>
        <MdEditor previous={answer.content} editorRef={editorRef} />
        <div className="flex justify-center my-5">
          <Button buttonTheme="primary" className="p-2 w-[50px]" type="submit">
            Save
          </Button>
        </div>
      </form>
    )
  }

  const DateBox = () => {
    return (
      <div className="max-h-[52px] flex flex-col justify-center">
        <div>답변일시: {getDate({ date: answer.created_date })}</div>
        <div className="flex justify-between">
          {isEdited && (
            <div className="text-right text-slate-400">(수정됨)</div>
          )}
        </div>
      </div>
    )
  }

  const ProfileImageBox = () => {
    return (
      <div className="ml-[20px] w-[50px] h-[50px] relative">
        <Image
          src={answer.member_image_url}
          alt="답변자 프로필 이미지"
          fill
          className="object-cover rounded-full"
        />
      </div>
    )
  }

  const UserInfoBox = () => {
    return (
      <div className="ml-[20px] text-center">
        <div className="px-2 bg-[#F3EDC8] rounded-md mb-1">
          {answer.created_by}
        </div>
        <div className="text-center flex justify-center">
          <div className="flex flex-col justify-center">
            <Image
              src={answer.rank_image_url}
              alt="답변자 배지 이미지"
              width={20}
              height={20}
            />
          </div>
          <div className="ml-1">Lv.{answer.author_level}</div>
        </div>
      </div>
    )
  }

  const HandleAnswerBox = () => {
    if (isMyAnswer)
      return (
        <div className="flex">
          <div onClick={handleEditMode} className="mr-3">
            수정하기
          </div>
          <div onClick={() => console.log("답변 삭제")}>삭제하기</div>
        </div>
      )
  }

  return (
    <div className="border-b-[1px] border-b-gray my-5">
      <div className="flex justify-between">
        <VoteBox answer={answer} userId={user?.member_id} />
        <div className="w-[90%]">
          {isAnswerEditMode ? (
            <EditAnswerBox />
          ) : (
            <MdViewer content={answer.content} />
          )}
        </div>
      </div>
      <div className="flex justify-end my-5">
        <DateBox />
        <ProfileImageBox />
        <UserInfoBox />
      </div>
      <div className="flex justify-end text-[#3887BE] cursor-pointer my-4">
        {/* <div>댓글 쓰기</div> */}
        <HandleAnswerBox />
      </div>
    </div>
  )
}

export default OneAnswer

interface VoteBoxProps {
  answer: Answer
  userId: number | undefined
}

const VoteBox = ({ answer, userId }: VoteBoxProps) => {
  const { vote, handleRaise, handleReduce } = useAnswerVote({
    answer,
    userId,
  })

  return (
    <form className="mr-5">
      <div className="flex justify-center">
        <VoteIcons.Up
          className="text-[30px] hover:text-primary"
          onClick={handleRaise}
        />
      </div>
      <div className="text-[30px]">
        {vote.value < 10 ? "0" + vote.value : vote.value}
      </div>
      <div className="flex justify-center">
        <VoteIcons.Down
          className="text-[30px] hover:text-primary"
          onClick={handleReduce}
        />
      </div>
    </form>
  )
}
