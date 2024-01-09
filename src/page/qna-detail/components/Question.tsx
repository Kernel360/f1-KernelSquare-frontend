"use client"
import { questionQueries } from "@/react-query/question"
import Image from "next/image"
import { getDate, getDeadline } from "@/util/getDate"
import dynamic from "next/dynamic"
import Tag from "@/components/shared/tag/Tag"

const MdViewer = dynamic(() => import("./Markdown/MdViewer"), {
  ssr: false,
})

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
          {question.skills.map((skill, index) => {
            return (
              <Tag
                key={`${id}-${index}-${skill}`}
                className="px-3 py-2 bg-slate-200 rounded mr-3"
              >
                {skill}
              </Tag>
            )
          })}
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
          <div className="ml-[20px] text-center">
            <div className="px-2 bg-[#F3EDC8] rounded-md mb-1">
              {question.nickname}
            </div>
            <div className="text-center flex mt-2 justify-around">
              <div>
                <Image
                  src={question.level_image_url}
                  alt="질문자 등급 배지"
                  width={20}
                  height={20}
                />
              </div>
              <div>Lv. {question.level}</div>
            </div>
          </div>
        </div>
        <MdViewer content={question.content} />
      </div>
    )
}

export default Question
