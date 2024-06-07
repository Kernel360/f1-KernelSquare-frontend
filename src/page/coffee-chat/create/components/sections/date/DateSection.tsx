import DaySelectTabs from "../../DaySelectTabs"
import Spacing from "@/components/shared/Spacing"
import { FaAngleLeft, FaAngleUp } from "react-icons/fa"
import DateResetAndCount from "./DateResetAndCount"
import { useSelectedChatTime } from "../../../hooks/useSelectedChatTime"

function DateSection() {
  const { selectedDate } = useSelectedChatTime()

  if (!selectedDate)
    return (
      <section className="relative flex w-full h-full justify-center items-center">
        <div className="flex sm:hidden justify-center absolute w-full h-5 left-0 -top-8">
          <FaAngleUp className="text-colorsDarkGray text-xl animate-in slide-in-from-bottom-2 duration-700 repeat-infinite direction-alternate" />
        </div>
        <span className="relative font-bold text-primary whitespace-pre-line">
          {`원하는 시작 일자를 클릭하면\n시간대를 설정할 수 있습니다.`}
          <span className="hidden sm:flex items-center absolute w-5 h-full -left-8 top-0 bottom-0 my-auto">
            <FaAngleLeft className="text-colorsDarkGray text-xl animate-in slide-in-from-right-2 duration-700 repeat-infinite direction-alternate" />
          </span>
        </span>
      </section>
    )

  return (
    <section>
      <Spacing size={16} />
      <DaySelectTabs />
      <Spacing size={16} />
      <DateResetAndCount />
    </section>
  )
}

export default DateSection
