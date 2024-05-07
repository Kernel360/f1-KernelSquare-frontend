"use client"

import type { CoffeeChatReservationTime } from "@/interfaces/dto/coffee-chat/coffeechat-reservation-detail.dto"
import SelectedReservationTime from "../mentee/SelectedReservationTime"
import DetailPageCalendarWrapper from "../DetailPageCalendarWrapper"
import ChatAuthorCalendar from "../calendar/ChatAuthorCalendar"
import Spacing from "@/components/shared/Spacing"
import PeriodTypeInfo from "../calendar/type-info/PeriodTypeInfo"
import ReservedTimes from "./reservation-time/ReservedTimes"

interface MentorProps {
  reservation: CoffeeChatReservationTime[]
  title: string
}

function ReservationForMentor({ reservation, title }: MentorProps) {
  const startTime = reservation[0].start_time

  return (
    <section>
      <section className="mb-4 sm:mb-6">
        <h3 className="font-bold text-base sm:text-xl">커피 챗 시간</h3>
        <Spacing size={16} />
        <h4 className="text-[#828282]">
          커피 챗의 날짜와 시간을 확인해보세요.
        </h4>
      </section>
      <DetailPageCalendarWrapper
        classNames={{
          dataComponent: {
            container: "mt-3 sm:mt-0",
            wrapper: "shadow-[2px_2px_8px_rgba(0,0,0,.1)]",
          },
        }}
        calendarComponent={
          <div>
            <ChatAuthorCalendar startTime={reservation[0].start_time} />
            <div className="mt-3">
              <PeriodTypeInfo />
            </div>
          </div>
        }
        dataComponent={
          <div>
            <SelectedReservationTime startTime={startTime} />
            <div className="relative">
              <ReservedTimes
                chatTitle={title}
                reservation={reservation}
                startTime={startTime}
              />
              <div className="hidden sm:block absolute left-0 right-0 bottom-0 w-[calc(100%-32px)] h-9 mx-auto bg-gradient-to-b from-white/0 from-[10%] to-white" />
            </div>
          </div>
        }
      />
    </section>
  )
}

export default ReservationForMentor
