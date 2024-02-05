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
    <div className="w-[80%] m-auto mt-5">
      <CoffeeChatDetailHeader
        article_id={coffeeChatDetailPayload.article_id}
        title={coffeeChatDetailPayload.title}
        nickname={coffeeChatDetailPayload.nickname}
        member_image_url={coffeeChatDetailPayload.member_image_url}
        level={coffeeChatDetailPayload.level}
        level_image_url={coffeeChatDetailPayload.level_image_url}
        hashtags={coffeeChatDetailPayload.hashtags}
      />
      <Spacing size={35} />
      <CoffeeChatDetailContent content={coffeeChatDetailPayload.content} />
      <Spacing size={32} />
      <div className="w-full flex justify-center items-center">
        <EnterCoffeeChat
          articleTitle={coffeeChatDetailPayload.title}
          roomId={1}
        />
      </div>
      <Spacing size={32} />
      <ScheduleMentoringSession
        mentor={coffeeChatDetailPayload.member_id}
        reservation={coffeeChatDetailPayload.date_times}
        created={coffeeChatDetailPayload.created_date}
      />
    </div>
  )
}

export default CoffeeChatDetailPage
