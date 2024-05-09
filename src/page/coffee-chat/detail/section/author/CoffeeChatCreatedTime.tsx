import { getKorRelativeTime } from "@/util/getDate"
import dayjs from "dayjs"

interface CoffeeChatCreatedTimeProps {
  createdAt: string
}

function CoffeeChatCreatedTime({ createdAt }: CoffeeChatCreatedTimeProps) {
  const now = dayjs().format()

  return (
    <span className="text-[#828282] text-sm flex-shrink-0">
      {getKorRelativeTime({
        now,
        targetDate: createdAt,
      })}
    </span>
  )
}

export default CoffeeChatCreatedTime
