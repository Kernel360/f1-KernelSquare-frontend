"use client"

import dynamic from "next/dynamic"
import Tag from "@/components/shared/tag/Tag"
import UserInfo, { UserProfileInfo } from "@/components/shared/user/UserInfo"
import QuestionDueDate from "./QuestionDueDate"
import QuestionControl from "./QuestionControl"
import { Question as QuestionType } from "@/interfaces/question"

interface QuestionProps {
  question: QuestionType
}

const QuestionMdViewer = dynamic(
  () => import("@/components/shared/toast-ui-editor/viewer/ContentViewer"),
  {
    ssr: false,
    loading(loadingProps) {
      return <div className="skeleton w-full h-[328px] mt-2.5 rounded-md"></div>
    },
  },
)

const Question = ({ question }: QuestionProps) => {
  const questionAuthor: UserProfileInfo = {
    id: question.member_id,
    nickname: question.nickname,
    profileImageUrl: question.member_image_url,
    level: question.level,
    levelImageUrl: question.level_image_url,
  }

  return (
    <div className="max-w-full min-w-[200px] mb-6">
      <section className="flex w-full max-w-full gap-x-2 font-bold text-2xl sm:text-xl sm:mt-6 mb-6">
        <span className="text-primary">Q.</span>
        <h3 className="text-[#444444]">{question.title}</h3>
      </section>
      <div className="flex w-full flex-col sm:flex-row gap-y-2 sm:justify-between sm:items-center pb-4 border-b border-b-[#E0E0E0]">
        <div className="w-fit">
          <UserInfo user={questionAuthor} />
        </div>
        <div className="ml-2">
          <QuestionDueDate questionCreatedDate={question.created_date} />
        </div>
      </div>
      <QuestionControl question={question} />
      <QuestionMdViewer domain="question" content={question.content} />
      <ul className="flex gap-x-3 gap-y-2 flex-wrap mt-6">
        {question?.skills.map((skill, index) => {
          return (
            <Tag
              key={`${index}-${skill}`}
              wrapperClassName="bg-[#F2F2F2] rounded-sm inline-flex align-top"
              className="rounded-sm bg-inherit text-xs shadow-none"
            >
              {skill}
            </Tag>
          )
        })}
      </ul>
    </div>
  )
}

export default Question
