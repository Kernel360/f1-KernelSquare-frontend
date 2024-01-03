"use client"

import React, { useEffect } from "react"
import Question from "./components/Question"
import MyAnswer from "./components/MyAnswer"
import AnswerList from "./components/Answers/AnswerList"
import { questionQueries } from "@/react-query/question"
import ContentLoading from "@/components/shared/animation/ContentLoading"
import { useNickname } from "@/hooks/useUser"
import { useRecoilState } from "recoil"
import { AnswerEditMode } from "@/recoil/atoms/mode"
import type { Answer } from "@/interfaces/answer"

const QnADetail: React.FC<{ id: string }> = ({ id }) => {
  const { data, isPending } = questionQueries.useQuestionData({
    id: Number(id),
  })

  const { data: member, refetch } = useNickname()

  const [isAnswerEditMode, setIsAnswerEditMode] = useRecoilState(AnswerEditMode)

  const handleCheckMyAnswer = (list?: Answer[], nickname?: string) =>
    list?.some((answer) => answer.created_by === nickname)

  useEffect(() => {
    const fetchData = async () => {
      await refetch()
      if (handleCheckMyAnswer(data?.data?.list, member)) {
        setIsAnswerEditMode(false)
      } else {
        setIsAnswerEditMode(true)
      }
    }

    fetchData()
  }, [data, member, refetch, setIsAnswerEditMode])

  // 질문 작성자가 본인인지
  if (data?.data?.nickname === member) setIsAnswerEditMode(false)

  if (isPending || !data) return <Loading />

  if (data)
    return (
      <div className="relative box-border flex-1 p-10">
        <div className="w-[calc(100%-12px)] sm:w-[calc(100%-22px)] lg:w-[calc(100%-42px)] mx-auto">
          <div className="font-bold text-[36px]">Q&A</div>
          <Question id={Number(id)} />
          {isAnswerEditMode && (
            <>
              <MyAnswer id={Number(id)} isEditMode={isAnswerEditMode} />
            </>
          )}
          <Title title="Answers" />
          <AnswerList list={data?.data?.list} user={member} />
        </div>
      </div>
    )
}

export default QnADetail

const Title: React.FC<{ title: string }> = ({ title }) => {
  return <div className="font-bold text-[24px]">{title}</div>
}

function Loading() {
  return (
    <div className="h-full">
      <ContentLoading
        style={{
          width: "calc(100% - 80px)",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      />
    </div>
  )
}
