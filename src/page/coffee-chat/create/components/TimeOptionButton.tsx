import Button from "@/components/shared/button/Button"
import { twMerge } from "tailwind-merge"
import { getTime } from "@/util/getDate"
import { MAXIMUM_SELCTE_CHAT_TIME_NUM } from "@/recoil/atoms/coffee-chat/date"
import { toast } from "react-toastify"
import { validationMessage } from "@/constants/message/validation"
import { useCoffeeChatFormContext } from "../../hooks/useCoffeeChatFormContext"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

interface TimeOptionButtonProps {
  dateTime: Date
  disabled?: boolean
}

function TimeOptionButton({ dateTime, disabled }: TimeOptionButtonProps) {
  const { dateTimeFieldArray } = useCoffeeChatFormContext()

  const selected = dateTimeFieldArray.fields.some((field) =>
    dayjs(field.startTime).isSame(dateTime),
  )

  const classNames = twMerge([
    "w-full h-[38px] shadow-sm gap-0.5 justify-center items-center p-0 rounded bg-white border border-colorsGray disabled:bg-colorsGray disabled:text-colorsDarkGray pointerhover:hover:bg-colorsLightGray",
    selected && "bg-info pointerhover:hover:bg-[#ecf8ff]",
  ])

  const handleTime = () => {
    if (
      !selected &&
      dateTimeFieldArray.fields.length >= MAXIMUM_SELCTE_CHAT_TIME_NUM
    ) {
      toast.error(validationMessage.coffeeChat.maximumReservationTimeLength, {
        position: "top-center",
        toastId: "maxChatTimes",
      })

      return
    }

    if (selected) {
      dateTimeFieldArray.removeDateTime(dateTime)
    } else {
      dayjs.extend(utc)
      dateTimeFieldArray.append({ startTime: dayjs(dateTime).utc().format() })
    }
  }

  return (
    <Button
      type="button"
      className={classNames}
      disabled={disabled}
      onClick={disabled ? undefined : handleTime}
    >
      <time>{getTime(dateTime)}</time>
    </Button>
  )
}

export default TimeOptionButton
