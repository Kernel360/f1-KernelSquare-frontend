import { Answer } from "@/interfaces/answer"
import OneAnswer from "./OneAnswer"

interface AnswerProps {
  list: Answer[] | undefined
  user: string | undefined
}

const AnswerList: React.FC<AnswerProps> = ({ list, user }) => {
  return (
    <div className="max-w-full box-border border border-colorsGray rounded-lg p-10 my-5">
      {list?.map((answer) => (
        <OneAnswer key={answer.answer_id} answer={answer} user={user} />
      ))}
    </div>
  )
}

export default AnswerList
