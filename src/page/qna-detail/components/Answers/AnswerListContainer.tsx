"use client"

import { answerQueries } from "@/react-query/answers"
import ContentLoading from "@/components/shared/animation/ContentLoading"
import LightBulb from "@/components/shared/animation/LightBulb"
import useQnADetail from "../../hooks/useQnADetail"
import { useClientSession } from "@/hooks/useClientSession"
import { Switch } from "@/components/ui/Switch"
import { useId, useMemo } from "react"
import dayjs from "dayjs"
import AnswerList from "./AnswerList"
import { useGetAnswers } from "../../hooks/answer/useGetAnswers"

export interface AnswerProps {
  questionId: number
  isQuestionAuthor: boolean
}

const AnswerListContainer: React.FC<AnswerProps> = ({
  questionId,
  isQuestionAuthor,
}) => {
  const { user } = useClientSession()

  const id = useId()
  const switchId = `${id}-answer`

  const { filterMyAnswer, setChecked } = useQnADetail()

  const { data, isPending } = useGetAnswers({
    questionId,
  })

  const answerList = data?.data?.answer_responses
  const hasAnswer = answerList?.length

  const now = useMemo(() => {
    return dayjs().format()
  }, [answerList]) /* eslint-disable-line */

  if (isPending) return <Loading />

  if (!hasAnswer) {
    return <NoAnswer isQuestionAuthor={isQuestionAuthor} />
  }

  const filteredAnswerList = filterMyAnswer(answerList)

  return (
    <div>
      <div className="flex flex-wrap justify-between">
        <div>
          <span className="font-bold text-[#333]">답변</span>
          <span>
            (<span>{hasAnswer ? answerList.length : 0}</span>)
          </span>
        </div>
        {!!user && hasAnswer ? (
          <div className="flex gap-3 items-center">
            <label htmlFor={switchId} className="text-[#8C8C8C] text-sm">
              내 답변 보기
            </label>
            <Switch
              id={switchId}
              className="w-12 h-6 border border-[#F2F2F2] data-[state=unchecked]:bg-[#E0E0E0] [&>span]:w-[22.5px] [&>span]:h-[22.5px] [&>span]:data-[state=checked]:translate-x-6"
              onCheckedChange={setChecked}
            />
          </div>
        ) : null}
      </div>
      <div
        className={`max-w-full box-border mt-6 ${
          filteredAnswerList?.length ? "p-6" : "p-0"
        }`}
      >
        <AnswerList answerList={filteredAnswerList} now={now} />
      </div>
    </div>
  )
}

export default AnswerListContainer

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

const NoAnswer = ({ isQuestionAuthor }: { isQuestionAuthor: boolean }) => {
  return (
    <div className="w-full border border-[#E0E0E0] rounded-lg flex flex-col gap-6 justify-center items-center py-6">
      <div className="w-[180px] min-h-[160px]">
        <LightBulb />
      </div>
      <div className="flex flex-col items-center text-sm text-[#828282]">
        {isQuestionAuthor ? (
          <>
            <span>아직 작성된 답변이 존재하지 않습니다.</span>
            <span>AI 인턴이 답변 작성 중일 수도 있어요!</span>
          </>
        ) : (
          <>
            <span>아직 작성된 답변이 존재하지 않습니다.</span>
            <span>첫 번째 답변의 주인공이 되어보세요!</span>
          </>
        )}
      </div>
    </div>
  )
}
