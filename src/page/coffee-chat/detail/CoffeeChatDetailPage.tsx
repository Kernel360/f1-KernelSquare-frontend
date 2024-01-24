"use client"

import Spacing from "@/components/shared/Spacing"
import CoffeeChatDetailContent from "./CoffeeChatDetailContent"
import CoffeeChatDetailHeader from "./CoffeeChatDetailHeader"
import { CoffeeChatReservationDetailPayload } from "@/interfaces/dto/coffee-chat/coffeechat-reservation-detail.dto"
import EnterCoffeeChat from "./EnterCoffeeChat"
import ScheduleMentoringSession from "./reservation/ScheduleMentoringSession"

interface CoffeeChatDetailPageProps {
  coffeeChatDetailPayload: CoffeeChatReservationDetailPayload
}

function CoffeeChatDetailPage({
  coffeeChatDetailPayload,
}: CoffeeChatDetailPageProps) {
  return (
    <div className="">
      <CoffeeChatDetailHeader
        title={coffeeChatDetailPayload.title}
        nickname={coffeeChatDetailPayload.nickname}
        member_image_url={coffeeChatDetailPayload.member_image_url}
        level={coffeeChatDetailPayload.level}
        level_image_url={coffeeChatDetailPayload.level_image_url}
        hash_tag_list={coffeeChatDetailPayload.hash_tag_list}
      />
      <Spacing size={16} />
      <CoffeeChatDetailContent content={coffeeChatDetailPayload.content} />
      <Spacing size={32} />
      <div className="w-full flex justify-center items-center">
        <EnterCoffeeChat />
      </div>
      <Spacing size={32} />
      <ScheduleMentoringSession />
    </div>
  )
}

export default CoffeeChatDetailPage
