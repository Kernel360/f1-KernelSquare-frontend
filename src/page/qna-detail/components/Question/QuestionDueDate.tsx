import { getDate, getDeadline } from "@/util/getDate"
import { MdHorizontalRule } from "react-icons/md"

interface QuestionDueDateProps {
  questionCreatedDate: string
}

function QuestionDueDate({ questionCreatedDate }: QuestionDueDateProps) {
  const createdDateFormat = getDate({ date: questionCreatedDate })
  const dueDateFormat = getDeadline({ date: questionCreatedDate })

  return (
    <div className="flex flex-col sm:flex-row gap-y-2 sm:gap-x-4 sm:items-center text-[#828282]">
      <span className="text-sm leading-[16px]">
        생성일 : {createdDateFormat}
      </span>
      <MdHorizontalRule className="text-[#E0E0E0] rotate-90 hidden sm:block" />
      <span className="text-sm leading-[16px]">마감일 : {dueDateFormat}</span>
    </div>
  )
}

export default QuestionDueDate
