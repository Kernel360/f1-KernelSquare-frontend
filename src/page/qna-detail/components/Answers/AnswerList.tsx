"use client"

import OneAnswer from "./OneAnswer"
import { answerQueries } from "@/react-query/answers"
import ContentLoading from "@/components/shared/animation/ContentLoading"
import LightBulb from "@/components/shared/animation/LightBulb"
import { notificationMessage } from "@/constants/message"
import useQnADetail from "../../hooks/useQnADetail"
import type { AnswerProps, NoAnswerProps } from "./AnswerList.types"

const AnswerList: React.FC<AnswerProps> = ({
  createdby,
  questionId,
  isMyAnswer,
}) => {
  const { data, isPending } = answerQueries.useGetAnswers({
    questionId,
  })
  const { filterMyAnswer, handleIsChecked } = useQnADetail()
  const isAnswer = !!data?.data?.length

  if (isPending) return <Loading />

  if (data)
    return (
      <div>
        <div className="flex flex-wrap justify-between">
          <div className="font-bold text-[24px]">Answers</div>
          <div className="mt-3 flex items-center">
            <input
              type="checkbox"
              id="My Answer"
              className="mr-3"
              onChange={handleIsChecked}
            />
            <label htmlFor="My Answer">내 답변 보기</label>
          </div>
        </div>
        <div className="max-w-full box-border border border-colorsGray rounded-lg p-10 my-5">
          {!isAnswer && <NoAnswer isMyAnswer={isMyAnswer} />}
          {isAnswer &&
            !!data.data &&
            filterMyAnswer(data?.data).map((answer) => (
              <OneAnswer
                key={answer.answer_id}
                answer={answer}
                createdby={createdby}
              />
            ))}
        </div>
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

const NoAnswer: React.FC<NoAnswerProps> = ({ isMyAnswer }) => {
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
