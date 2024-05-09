import Button from "@/components/shared/button/Button"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs"
import { getTime } from "@/util/getDate"
import { useSelectedChatTimes } from "../hooks/useSelectedChatTimes"
import { MAXIMUM_SELCTE_CHAT_TIME_NUM } from "@/recoil/atoms/coffee-chat/date"
import { toast } from "react-toastify"
import { validationMessage } from "@/constants/message/validation"

interface TimeOptionButtonProps {
  dateTime: Date
}

function TimeOptionButton({ dateTime }: TimeOptionButtonProps) {
  const {
    selectedChatTimeList,
    count,
    addSelectedChatTime,
    removeSelectedChatTime,
  } = useSelectedChatTimes()

  const selected = selectedChatTimeList
    ? selectedChatTimeList.some((chatTime) => {
        return dayjs(chatTime as string).isSame(dateTime)
      })
    : false

  const classNames = twMerge([
    "w-full h-[38px] shadow-sm gap-0.5 justify-center items-center p-0 rounded bg-white border border-colorsGray disabled:bg-colorsGray disabled:text-colorsDarkGray pointerhover:hover:bg-colorsLightGray",
    selected && "bg-info",
  ])

  const handleTime = () => {
    if (!selected && count >= MAXIMUM_SELCTE_CHAT_TIME_NUM) {
      toast.error(validationMessage.overtimeCntLimit, {
        position: "top-center",
        toastId: "maxChatTimes",
      })

      return
    }

    selected
      ? removeSelectedChatTime({ dateTime })
      : addSelectedChatTime({ dateTime })
  }

  return (
    <Button type="button" className={classNames} onClick={handleTime}>
      <time>{getTime(dateTime)}</time>
    </Button>
  )
}

export default TimeOptionButton
