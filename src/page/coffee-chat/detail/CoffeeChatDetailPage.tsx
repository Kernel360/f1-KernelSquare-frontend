"use client"

import Spacing from "@/components/shared/Spacing"
import CoffeeChatDetailContent from "./CoffeeChatDetailContent"
import CoffeeChatDetailHeader from "./CoffeeChatDetailHeader"
import { CoffeeChatReservationDetailPayload } from "@/interfaces/dto/coffee-chat/coffeechat-reservation-detail.dto"
import EnterCoffeeChat from "./EnterCoffeeChat"
import ScheduleMentoringSession from "./reservation/ScheduleMentoringSession"
import { useClientSession } from "@/hooks/useClientSession"

interface CoffeeChatDetailPageProps {
  coffeeChatDetailPayload: CoffeeChatReservationDetailPayload
}

function CoffeeChatDetailPage({
  coffeeChatDetailPayload,
}: CoffeeChatDetailPageProps) {
  const { user } = useClientSession()

  const matchRoom = user
    ? coffeeChatDetailPayload.date_times.find((dateTime) => {
        return dateTime.mentee_nickname === user?.nickname
      }) ?? null
    : null

  const isMentee =
    !user?.roles.includes("ROLE_MENTOR") ||
    coffeeChatDetailPayload.member_id !== user?.member_id

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
        {isMentee && (
          <EnterCoffeeChat
            articleTitle={coffeeChatDetailPayload.title}
            roomId={matchRoom ? matchRoom.room_id : null}
            startTime={matchRoom?.start_time || null}
            reservation_id={matchRoom?.reservation_id ?? -1}
          />
        )}
      </div>
      <Spacing size={32} />
      <ScheduleMentoringSession
        mentor={coffeeChatDetailPayload.member_id}
        reservation={coffeeChatDetailPayload.date_times}
        created={coffeeChatDetailPayload.created_date}
        title={coffeeChatDetailPayload.title}
      />
    </div>
  )
}

export default CoffeeChatDetailPage
