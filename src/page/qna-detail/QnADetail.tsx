import React from "react"
import Question from "./components/Question"
import MyAnswer from "./components/MyAnswer"
import AnswerList from "./components/Answers/AnswerList"

const QnADetail: React.FC<{ id: string }> = ({ id }) => {
  return (
    <div className="relative box-border flex-1 py-4">
      <div className="w-[calc(100%-12px)] sm:w-[calc(100%-22px)] lg:w-[calc(100%-42px)] mx-auto">
        <Title title="Q&A" />
        <Question />
        <Title title="My Answer" />
        <MyAnswer />
        <Title title="Answers" />
        <AnswerList />
      </div>
    </div>
  )
}

export default QnADetail

const Title: React.FC<{ title: string }> = ({ title }) => {
  return <div className="font-bold text-[24px]">{title}</div>
}
