"use client"

import type { Answer } from "@/interfaces/answer"
import Image from "next/image"
import { getDate } from "@/util/getDate"
import { VoteIcons } from "@/components/icons/Icons"
import dynamic from "next/dynamic"
import { useRecoilState } from "recoil"
import voteAtoms from "@/recoil/atoms/vote"
import { useEffect, useRef, useState } from "react"
import Button from "@/components/shared/button/Button"
import { voteAnswer } from "@/service/answers"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import queryKey from "@/constants/queryKey"
import badge_url from "@/assets/images/badges"
import type { Editor } from "@toast-ui/react-editor"

const MdViewer = dynamic(() => import("../Markdown/MdViewer"), {
  ssr: false,
})

const MdEditor = dynamic(() => import("../Markdown/MdEditor"), {
  ssr: false,
})

interface OneAnswerProps {
  answer: Answer
  user: string | undefined
}

const OneAnswer: React.FC<OneAnswerProps> = ({ answer, user }) => {
  const isEdited = answer.created_date !== answer.modified_date
  const isMyAnswer = user === answer.created_by

  const editorRef = useRef<Editor>(null)

  // 답변 투표
  const [vote, setVote] = useRecoilState(voteAtoms(answer?.created_by))

  const queryClient = useQueryClient()

  const { data, mutate } = useMutation({
    mutationKey: ["ans"],
    mutationFn: ({
      answer_id,
      member_id,
      status,
    }: {
      answer_id: number
      member_id: number
      status: 1 | -1
    }) => voteAnswer({ answerId: answer_id, member_id, status }),
    onSuccess: () => console.log("투표 성공"),
    onError: (error) => console.log("error", error.message),
  })

  const handleRaise = () => {
    setVote({ ...vote, value: vote.value + 1 })
    try {
      mutate({ answer_id: answer.answer_id, member_id: 1, status: 1 })
      console.log("[set vote]", { data })

      queryClient.invalidateQueries({ queryKey: [queryKey.answer] })
    } catch (err) {
      console.error("error", err)
    }
  }

  const handleReduce = () => {
    setVote({ ...vote, value: vote.value - 1 })
    try {
      voteAnswer({
        answerId: answer.answer_id,
        member_id: 1,
        status: -1,
      }).then((res) => {
        console.log("res", res.data.msg, res.config.data)
        queryClient.invalidateQueries({ queryKey: [queryKey.answer] })
      })
    } catch (err) {
      console.error("error", err)
    }
  }

  useEffect(() => {
    setVote({ ...vote, value: answer.vote_count })
  }, [])

  // 답변 수정
  const [isAnswerEditMode, setIsAnswerEditMode] = useState(false)

  return (
    <div className="border-b-[1px] border-b-gray my-5">
      <div className="flex justify-between">
        <form className="mr-5">
          <div className="flex justify-center">
            <VoteIcons.Up
              className="text-[30px] hover:text-primary"
              onClick={handleRaise}
            />
          </div>
          <div className="text-[30px]">{vote.value}</div>
          <div className="flex justify-center">
            <VoteIcons.Down
              className="text-[30px] hover:text-primary"
              onClick={handleReduce}
            />
          </div>
        </form>
        {isAnswerEditMode ? (
          <form>
            <MdEditor previous={answer.content} editorRef={editorRef} />
            <div className="flex justify-center my-5">
              <Button buttonTheme="primary" className="p-2 w-[50px]">
                Save
              </Button>
            </div>
          </form>
        ) : (
          <MdViewer content={answer.content} />
        )}
      </div>
      <div className="flex justify-end mb-5">
        <div className="max-h-[52px] flex flex-col justify-center">
          <div>답변일시: {getDate({ date: answer.created_date })}</div>
          <div className="flex justify-between">
            {isEdited && (
              <div className="text-right text-slate-400">(수정됨)</div>
            )}
          </div>
        </div>
        <div className="ml-[20px] w-[50px] h-[50px] relative">
          <Image
            src={answer.member_image_url}
            alt="답변자 프로필 이미지"
            fill
            className="object-cover rounded-full"
          />
        </div>
        <div className="ml-[20px]">
          <div className="px-2 bg-[#F3EDC8] rounded-md mb-1">
            {answer.created_by}
          </div>
          <div className="text-center flex justify-center">
            <div>
              <Image
                src={badge_url[answer.level]}
                alt="답변자 배지 이미지"
                width={20}
                height={20}
              />
            </div>
            <div className="ml-1">Lv.{answer.level}</div>
          </div>
        </div>
      </div>
      <div className="flex justify-end text-[#3887BE] cursor-pointer my-4">
        {/* <div>댓글 쓰기</div> */}
        {isMyAnswer && (
          <div onClick={() => setIsAnswerEditMode((prev: boolean) => !prev)}>
            수정하기
          </div>
        )}
      </div>
    </div>
  )
}

export default OneAnswer
