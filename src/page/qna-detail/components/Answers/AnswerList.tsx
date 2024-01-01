import { Answer } from "@/interfaces/answer"
import OneAnswer from "./OneAnswer"

interface AnswerProps {
  list: Answer[] | undefined
  user: string | undefined
}

const AnswerList: React.FC<AnswerProps> = ({ list, user }) => {
  return (
    <div className="max-w-full box-border border border-colorsGray rounded-lg p-10 my-5">
      {list?.length ? (
        list?.map((answer) => (
          <OneAnswer key={answer.answer_id} answer={answer} user={user} />
        ))
      ) : (
        <div>
          아직 작성된 답변이 존재하지 않습니다. 첫 번째 답변의 주인공이
          되어보세요!
        </div>
      )}
    </div>
  )
}

export default AnswerList
