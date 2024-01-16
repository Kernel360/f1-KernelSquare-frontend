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

  const TagList = question?.skills.map((skill, index) => {
    return (
      <Tag
        key={`${id}-${index}-${skill}`}
        className="px-3 py-2 bg-slate-200 rounded mr-3"
      >
        {skill}
      </Tag>
    )
  })

  const DetailClassName = twJoin([
    "flex mb-5",
    user?.nickname === question?.nickname ? "justify-between" : "justify-end",
  ])

  if (question)
    return (
      <div className="max-w-full box-border border border-colorsGray rounded-lg p-10 my-5">
        <div className="font-bold text-2xl mb-5">
          <span className="mr-[10px]">Q.</span>
          <span className="text-[#444444]">{question.title}</span>
        </div>
        <div className="flex mb-5">{TagList}</div>
        <div className={DetailClassName}>
          <HandleQuestionBox question={question!} />
          <div className="flex justify-end">
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
