import { RegisterOptions, ControllerRenderProps } from "react-hook-form"
import { MAXIMUM_SELCTE_CHAT_TIME_NUM } from "@/recoil/atoms/coffee-chat/date"
import { validationMessage } from "@/constants/message/validation"
import { CoffeeChatFormData } from "@/interfaces/form"

type DateTimeFieldRules = Omit<
  RegisterOptions<CoffeeChatFormData, "dateTimes">,
  "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
>

export type DateTimeField = ControllerRenderProps<
  CoffeeChatFormData,
  "dateTimes"
>

export const enum DateTimeRuleValidateType {
  "Empty" = "empty",
  "Maximum" = "maximum",
}

export const dateTimeRules: DateTimeFieldRules = {
  required: validationMessage.coffeeChat.emptyReservationTime,
  validate: {
    [DateTimeRuleValidateType.Empty]: (dateTimes) => {
      if (!dateTimes?.length) {
        return validationMessage.coffeeChat.emptyReservationTime
      }
    },
    [DateTimeRuleValidateType.Maximum]: (dateTimes) => {
      if (!dateTimes) return true

      if (dateTimes.length > MAXIMUM_SELCTE_CHAT_TIME_NUM) {
        return validationMessage.coffeeChat.maximumReservationTimeLength
      }

      return true
    },
  },
}
