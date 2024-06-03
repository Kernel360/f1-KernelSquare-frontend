import { Control, Controller } from "react-hook-form"
import { useSelectedChatTimes } from "../hooks/useSelectedChatTimes"
import { DateTimeField, dateTimeRules } from "./rules/datetime-rules"
import { useEffect, useRef } from "react"
import { CoffeeChatFormData } from "@/interfaces/form/coffee-chat-form"

interface DateTimesControllerProps {
  control: Control<CoffeeChatFormData, any>
}

function DateTimesController({ control }: DateTimesControllerProps) {
  const { selectedChatTimeList, count } = useSelectedChatTimes()

  const fieldRef = useRef<DateTimeField>()

  useEffect(() => {
    fieldRef.current?.onChange(selectedChatTimeList ?? [])
  }, [count]) /* eslint-disable-line */

  return (
    <Controller
      control={control}
      name="dateTimes"
      defaultValue={[]}
      rules={dateTimeRules}
      render={({ field, fieldState }) => {
        fieldRef.current = field

        return <></>
      }}
    />
  )
}

export default DateTimesController
