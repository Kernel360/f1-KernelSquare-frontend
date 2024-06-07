"use client"

import { CoffeeChatFormData } from "@/interfaces/form/coffee-chat-form"
import { useController, useFieldArray, useFormContext } from "react-hook-form"
import { dateTimeRules } from "../create/controls/rules/datetime-rules"
import dayjs from "dayjs"

export function useCoffeeChatDateTimeFieldArray() {
  const { control, resetField } = useFormContext<CoffeeChatFormData>()

  const { field } = useController({
    control,
    name: "dateTimes",
  })
  const { fields, ...fieldArray } = useFieldArray({
    control,
    name: "dateTimes",
    rules: dateTimeRules,
  })

  const removeDateTime = (dateTime: string | Date) => {
    const index = field.value.findIndex((field) =>
      dayjs(field.startTime).isSame(dateTime),
    )

    if (index > -1) {
      fieldArray.remove(index)
    }
  }

  const clearDateTime = () => {
    resetField("dateTimes")
  }

  const clearDate = (date: Date) => {
    const targetDateTimes = field.value.filter(
      (field) =>
        dayjs(field.startTime).format("YYYY-MM-DD") ===
        dayjs(date).format("YYYY-MM-DD"),
    )

    if (!targetDateTimes?.length) return

    const indexes = targetDateTimes.map((dateTime) =>
      field.value.findIndex((field) => field.startTime === dateTime.startTime),
    )
    fieldArray.remove(indexes)
  }

  return {
    fields: field.value,
    ...fieldArray,
    removeDateTime,
    clearDateTime,
    clearDate,
  }
}
