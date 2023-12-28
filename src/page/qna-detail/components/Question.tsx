"use client"
import { questionQueries } from "@/react-query/question"
import Image from "next/image"
import MdViewer from "./Markdown/MdViewer"
import { getDate, getDeadline } from "@/util/getDate"

const Question: React.FC<{ id: number }> = ({ id }) => {
  const { data } = questionQueries.useQuestionData({
    id: Number(id),
  })

  const question = data?.data

  if (question)
    return (
      <div className="max-w-full box-border border border-colorsGray rounded-lg p-10 my-5">
        <div className="font-bold text-2xl mb-5">
          <span className="mr-[10px]">Q.</span>
          <span className="text-[#444444]">{question.title}</span>
        </div>
        <div className="flex mb-5">
          {question.skills.map((skill) => (
            <div
              key={Math.random() * 1000}
              className="px-3 py-2 bg-slate-200 rounded mr-3"
            >
              {skill}
            </div>
          ))}
        </div>
        <div className="flex justify-end mb-5">
          <div>
            <div className="mb-1">
              생성일: {getDate({ date: question.created_date })}
            </div>
            <div>마감일: {getDeadline({ date: question.created_date })}</div>
          </div>
          <div className="ml-[20px] w-[50px] h-[50px] relative">
            <Image
              src={question.member_image_url}
              alt="질문자 프로필 사진"
              fill
              className="object-cover rounded-full"
            />
          </div>
          <div className="ml-[20px]">
            <div className="px-2 bg-[#F3EDC8] rounded-md mb-1">
              {question.nickname}
            </div>
            <div className="text-center">Lv. {question.level}</div>
          </div>
        </div>
        <MdViewer content={question.content} />
      </div>
    )
}

export default Question
