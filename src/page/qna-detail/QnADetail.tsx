"use client"

import React, { useEffect } from "react"
import Question from "./components/Question/Question"
import MyAnswer from "./components/MyAnswer"
import AnswerList from "./components/Answers/AnswerList"
import { questionQueries } from "@/react-query/question"
import ContentLoading from "@/components/shared/animation/ContentLoading"
import { answerQueries } from "@/react-query/answers"
import { useClientSession } from "@/hooks/useClientSession"
import useQnADetail from "./hooks/useQnADetail"

const QnADetail: React.FC<{ id: string }> = ({ id }) => {
  const { data, isPending } = questionQueries.useQuestionData({
    id: Number(id),
  })
  const { setIsAnswerMode, handleCheckMyAnswer } = useQnADetail()

  const { user } = useClientSession()

  const { data: answers, isPending: isAnswerPending } =
    answerQueries.useGetAnswers({
      questionId: Number(id),
    })

  useEffect(() => {
    const fetchData = async () => {
      if (
        answers?.data &&
        user?.nickname &&
        !handleCheckMyAnswer(answers.data, user.nickname) &&
        data?.data?.nickname !== user.nickname
      ) {
        setIsAnswerMode(true)
      }
    }

    fetchData()
  }, [answers, data?.data?.nickname, user?.nickname])

  if (isPending || isAnswerPending || !data) return <Loading />

  if (data)
    return (
      <div className="relative box-border flex-1 p-10">
        <div className="w-[calc(100%-12px)] sm:w-[calc(100%-22px)] lg:w-[calc(100%-42px)] mx-auto">
          <div className="font-bold text-[36px]">Q&A</div>
          <Question id={Number(id)} />
          <MyAnswer questionId={Number(id)} />
          <AnswerList
            createdby={user?.nickname!}
            questionId={Number(id)}
            isMyAnswer={data?.data?.nickname === user?.nickname}
          />
        </div>
      </div>
    )
}

export default QnADetail

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
