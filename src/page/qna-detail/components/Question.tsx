import { questionQueries } from "@/react-query/question"
import Image from "next/image"
import MdViewer from "./Markdown/MdViewer"

const Question: React.FC<{ id: number }> = ({ id }) => {
  const { data } = questionQueries.useQuestionData({
    id: Number(id),
  })

  const question = data?.data

  if (question)
    return (
      <div className="max-w-full box-border border border-colorsGray rounded-lg p-2 my-5">
        <div>
          <span>Q.</span>
          {question.title}
        </div>
        <div className="flex">
          {question.skills.map((skill) => (
            <div key={Math.random() * 1000}>{skill}</div>
          ))}
        </div>
        <div className="flex">
          <div>
            <div>생성일: {question.created_date}</div>
            <div>마감일: {question.created_date}</div>
          </div>
          <div>
            <Image
              src={question.member_image_url}
              alt="질문자 프로필 사진"
              width={50}
              height={50}
            />
          </div>
          <div>
            <div>{question.nickname}</div>
            <div>Lv. {question.level}</div>
          </div>
        </div>
        <MdViewer content={question.content} />
      </div>
    )
}

export default Question
