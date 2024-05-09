"use client"

import PageInfoArea from "@/components/shared/page-template/page-info-area/PageInfoArea"
import { twMerge } from "tailwind-merge"
import { CoffeeChatReservationDetailPayload } from "@/interfaces/dto/coffee-chat/coffeechat-reservation-detail.dto"
import NotLogined from "./NotLogined"
import ChatAccess from "./ChatAccess"
import { useClientSession } from "@/hooks/useClientSession"
// import dayjs from "dayjs"
// import ExpiredDueDate from "./ExpiredDueDate"

interface CoffeeChatAccessProps {
  coffeeChat: CoffeeChatReservationDetailPayload
}

function CoffeeChatAccess({ coffeeChat }: CoffeeChatAccessProps) {
  const { user } = useClientSession()

  const wrapperClassNames = twMerge([
    `flex w-full justify-between items-center p-4 bg-[#EAF7F0] rounded-md overflow-hidden border border-transparent`,
    `sm:p-0 sm:h-[97px] sm:pr-[34px] sm:bg-white sm:border-[#E0E0E0]`,
    user && user.member_id === coffeeChat.member_id && "hidden",
  ])

  // const sorted = coffeeChat.date_times
  //   .map((dateTime) => dateTime)
  //   .sort((a, b) => dayjs(b.start_time).diff(a.start_time))

  // const dueDate = dayjs(sorted[0].start_time).endOf("days")
  // const nowDate = dayjs()

  // const isExpired = nowDate.isAfter(dueDate)

  return (
    <PageInfoArea className={wrapperClassNames}>
      <PageInfoArea.NotLoginedUserArea>
        <NotLogined />
      </PageInfoArea.NotLoginedUserArea>
      <PageInfoArea.LoginedUserArea>
        <ChatAccess coffeeChat={coffeeChat} />
      </PageInfoArea.LoginedUserArea>
    </PageInfoArea>
  )
}

export default CoffeeChatAccess
