import { Control, Controller } from "react-hook-form"
import { useSelectedChatTimes } from "../hooks/useSelectedChatTimes"
import { DateTimeField, dateTimeRules } from "./rules/datetime-rules"
import { useEffect, useRef } from "react"
import { CoffeeChatFormData } from "@/interfaces/form/coffee-chat-form"
import { useDomainEditMode } from "@/hooks/editor/useDomainEditMode"

interface DateTimesControllerProps {
  control: Control<CoffeeChatFormData, any>
}

function DateTimesController({ control }: DateTimesControllerProps) {
  const editMode = useDomainEditMode()
  const { selectedChatTimeList, count } = useSelectedChatTimes()

  const fieldRef = useRef<DateTimeField>()

  useEffect(() => {
    if (editMode === "update") return

    fieldRef.current?.onChange(selectedChatTimeList ?? [])
  }, [count]) /* eslint-disable-line */

  return (
    <Controller
      control={control}
      name="dateTimes"
      rules={dateTimeRules}
      render={({ field, fieldState }) => {
        fieldRef.current = field

        return <></>
      }}
    />
  )
}

export default DateTimesController
