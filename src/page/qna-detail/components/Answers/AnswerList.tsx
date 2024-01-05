"use client"

import OneAnswer from "./OneAnswer"
import { answerQueries } from "@/react-query/answers"
import ContentLoading from "@/components/shared/animation/ContentLoading"
import LightBulb from "@/components/shared/animation/LightBulb"

interface AnswerProps {
  user: string | undefined
  id: number
}

const AnswerList: React.FC<AnswerProps> = ({ user, id }) => {
  const { data, isPending } = answerQueries.useGetAnswers({
    questionId: id,
  })

  if (isPending) return <Loading />

  if (data)
    return (
      <div className="max-w-full box-border border border-colorsGray rounded-lg p-10 my-5">
        {data?.data?.length ? (
          data?.data?.map((answer) => (
            <OneAnswer key={answer.answer_id} answer={answer} user={user} />
          ))
        ) : (
          <NoAnswer />
        )}
      </div>
    )
}

export default AnswerList

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

function NoAnswer() {
  return (
    <div className="text-center">
      <div className="flex justify-center">
        <LightBulb style={{ color: "#02A35F", width: "250px" }} />
      </div>
      <div className="text-xl">
        아직 작성된 답변이 존재하지 않습니다. 첫 번째 답변의 주인공이
        되어보세요!
      </div>
    </div>
  )
}
