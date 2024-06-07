import Button from "@/components/shared/button/Button"
import { MAXIMUM_SELCTE_CHAT_TIME_NUM } from "@/recoil/atoms/coffee-chat/date"
import dayjs from "dayjs"
import { useCoffeeChatFormContext } from "@/page/coffee-chat/hooks/useCoffeeChatFormContext"
import { useSelectedDayTab } from "../../../hooks/useSelectedDayTab"

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
  const { selectedDayTab } = useSelectedDayTab()
  const { dateTimeFieldArray } = useCoffeeChatFormContext()

  const dayInstance = dayjs(selectedDayTab as Date)

  return (
    <Button
      className="p-0.5 gap-1 pointerhover:hover:text-danger font-bold"
      onClick={() => dateTimeFieldArray.clearDate(dayInstance.toDate())}
    >
      <span>{dayInstance.format("YYYY.MM.DD")}</span>
      <span>시간 초기화</span>
    </Button>
  )
}

const Count = () => {
  const { dateTimeFieldArray } = useCoffeeChatFormContext()

  return (
    <div>
      <span>&#40;&nbsp;</span>
      <span
        className={`font-semibold ${
          dateTimeFieldArray.fields.length > 0 &&
          dateTimeFieldArray.fields.length <= MAXIMUM_SELCTE_CHAT_TIME_NUM
            ? "text-primary"
            : "text-danger"
        }`}
      >
        {dateTimeFieldArray.fields.length}
      </span>
      <span className="font-medium">&nbsp;/&nbsp;</span>
      <span className="font-semibold text-secondary">
        {MAXIMUM_SELCTE_CHAT_TIME_NUM}
      </span>
      <span>&nbsp;&#41;</span>
    </div>
  )
}
