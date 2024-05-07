"use client"

import { CoffeeChatReservationDetailPayload } from "@/interfaces/dto/coffee-chat/coffeechat-reservation-detail.dto"
import ScheduleMentoringSession from "./reservation/ScheduleMentoringSession"
import CoffeeChatAccess from "./access/CoffeeChatAccess"
import CoffeeChat from "./CoffeeChat"
import LinkToListPage from "@/components/LinkToListPage"
import Spacing from "@/components/shared/Spacing"

interface CoffeeChatDetailPageProps {
  coffeeChatDetailPayload: CoffeeChatReservationDetailPayload
}

function CoffeeChatDetailPage({
  coffeeChatDetailPayload,
}: CoffeeChatDetailPageProps) {
  return (
    <div className="px-6 py-6 sm:px-12 sm:py-2 pc:pl-[120px] pc:pr-[60px] pc:pt-[72px] pc:pb-12">
      <div className="hidden pc:block">
        <LinkToListPage to="chat" />
        <Spacing size={24} />
      </div>
      <div className="pb-6 mb-6 pc:mb-10">
        <CoffeeChat coffeeChat={coffeeChatDetailPayload} />
      </div>
      <div className="mb-12">
        <CoffeeChatAccess coffeeChat={coffeeChatDetailPayload} />
      </div>
      <div className="mb-20">
        <ScheduleMentoringSession
          authorId={coffeeChatDetailPayload.member_id}
          reservation={coffeeChatDetailPayload.date_times}
          title={coffeeChatDetailPayload.title}
        />
      </div>
    </div>
  )
}

export default CoffeeChatDetailPage
