import Button from "@/components/shared/button/Button"
import { useSelectedChatTimes } from "../../../hooks/useSelectedChatTimes"
import {
  MAXIMUM_SELCTE_CHAT_TIME_NUM,
  SelectedDayTab,
} from "@/recoil/atoms/coffee-chat/date"
import { useRecoilValue } from "recoil"
import dayjs from "dayjs"

function DateResetAndCount() {
  return (
    <section className="flex w-full p-1 justify-between">
      <Reset />
      <Count />
    </section>
  )
}

export default DateResetAndCount

const Reset = () => {
  const selectedDayTab = useRecoilValue(SelectedDayTab)
  const { clear } = useSelectedChatTimes()

  const dayInstance = dayjs(selectedDayTab as Date)

  return (
    <Button
      className="p-0.5 gap-1 pointerhover:hover:text-danger font-bold"
      onClick={() => clear({ dateTime: dayInstance.toDate() })}
    >
      <span>{dayInstance.format("YYYY.MM.DD")}</span>
      <span>시간 초기화</span>
    </Button>
  )
}

const Count = () => {
  const { count } = useSelectedChatTimes()

  return (
    <div>
      <span>&#40;&nbsp;</span>
      <span
        className={`font-semibold ${
          count > 0 && count <= MAXIMUM_SELCTE_CHAT_TIME_NUM
            ? "text-primary"
            : "text-danger"
        }`}
      >
        {count}
      </span>
      <span className="font-medium">&nbsp;/&nbsp;</span>
      <span className="font-semibold text-secondary">
        {MAXIMUM_SELCTE_CHAT_TIME_NUM}
      </span>
      <span>&nbsp;&#41;</span>
    </div>
  )
}
