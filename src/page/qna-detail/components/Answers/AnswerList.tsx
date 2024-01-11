"use client"

import OneAnswer from "./OneAnswer"
import { answerQueries } from "@/react-query/answers"
import ContentLoading from "@/components/shared/animation/ContentLoading"
import LightBulb from "@/components/shared/animation/LightBulb"
import { notificationMessage } from "@/constants/message"

interface AnswerProps {
  createdby: string
  questionId: number
  isMyAnswer: boolean
}

const AnswerList: React.FC<AnswerProps> = ({
  createdby,
  questionId,
  isMyAnswer,
}) => {
  const { data, isPending } = answerQueries.useGetAnswers({
    questionId,
  })

  if (isPending) return <Loading />

  if (data)
    return (
      <div className="max-w-full box-border border border-colorsGray rounded-lg p-10 my-5">
        {data?.data?.length ? (
          data?.data?.map((answer) => (
            <OneAnswer
              key={answer.answer_id}
              answer={answer}
              createdby={createdby}
            />
          ))
        ) : (
          <NoAnswer isMyAnswer={isMyAnswer} />
        )}
      </div>
    )
}

export default AnswerList

const Loading = () => {
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

const NoAnswer: React.FC<{ isMyAnswer: boolean }> = ({ isMyAnswer }) => {
  return (
    <div className="text-center">
      <div className="flex justify-center">
        <LightBulb style={{ color: "#02A35F", width: "250px" }} />
      </div>
      <div className="text-xl">
        {isMyAnswer
          ? notificationMessage.myQuestion
          : notificationMessage.noAnswer}
      </div>
    </div>
  )
}
