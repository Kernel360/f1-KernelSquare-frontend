import { Answer } from "@/interfaces/answer"
import OneAnswer from "./OneAnswer"

const AnswerList: React.FC<{ list: Answer[] | undefined }> = ({ list }) => {
  return (
    <div className="max-w-full box-border border border-colorsGray rounded-lg p-10 my-5">
      {list?.map((answer) => (
        <OneAnswer key={answer.answer_id} answer={answer} />
      ))}
    </div>
  )
}

export default AnswerList
