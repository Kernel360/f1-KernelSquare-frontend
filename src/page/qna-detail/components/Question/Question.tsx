"use client"
import { questionQueries } from "@/react-query/question"
import { getDate, getDeadline } from "@/util/getDate"
import dynamic from "next/dynamic"
import Tag from "@/components/shared/tag/Tag"
import WriterBox from "./WriterBox"
import HandleQuestionBox from "./HandleQuestionBox"
import { twJoin } from "tailwind-merge"
import useQnADetail from "../../hooks/useQnADetail"

const MdViewer = dynamic(() => import("../Markdown/MdViewer"), {
  ssr: false,
})

const Question: React.FC<{ id: number }> = ({ id }) => {
  const { data } = questionQueries.useQuestionData({
    id: Number(id),
  })

  const { user } = useQnADetail()

  const question = data?.data

  const DetailClassName = twJoin([
    "flex flex-wrap mb-5",
    user?.nickname === question?.nickname ? "justify-between" : "justify-end",
  ])

  if (!question) return null

  return (
    <div className="flex flex-col border-box border border-colorsGray rounded-lg p-3 sm:p-10 my-5 max-w-full min-w-[200px]">
      <h3 className="font-bold text-2xl mb-5 max-w-full md:font-[16px] sm:font-[12px] t text-[#444444]">
        Q. {question.title}
      </h3>
      <ul className="flex gap-1 flex-wrap my-1">
        {question?.skills.map((skill, index) => {
          return (
            <Tag
              key={`${id}-${index}-${skill}`}
              className="px-3 py-2 bg-slate-200 rounded mr-3"
            >
              {skill}
            </Tag>
          )
        })}
      </ul>
      <div className={DetailClassName}>
        <HandleQuestionBox question={question!} />
        <div className="w-full flex justify-end flex-wrap">
          <div>
            <div className="mb-1">
              생성일: {getDate({ date: question.created_date })}
            </div>
            <div>마감일: {getDeadline({ date: question.created_date })}</div>
          </div>
          <WriterBox question={question} />
        </div>
      </div>
      <MdViewer content={question.content} />
    </div>
  )
}

export default Question
