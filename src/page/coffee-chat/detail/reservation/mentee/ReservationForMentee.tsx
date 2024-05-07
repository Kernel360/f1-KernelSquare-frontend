import { CoffeeChatReservationTime } from "@/interfaces/dto/coffee-chat/coffeechat-reservation-detail.dto"
import TimeOptions from "./reservation-time/TimeOptions"
import Spacing from "@/components/shared/Spacing"
import ProgressModal from "./ProgressModal"
import ReservationCalendar from "../calendar/ReservationCalendar"
import SelectedReservationTime from "./SelectedReservationTime"
import ReservationTypeInfo from "./ReservationTypeInfo"
import DetailPageCalendarWrapper from "../DetailPageCalendarWrapper"

interface MenteeProps {
  reservation: CoffeeChatReservationTime[]
}

function ReservationForMentee({ reservation }: MenteeProps) {
  const startTime = reservation[0].start_time

  return (
    <section>
      <ProgressModal />
      <section className="mb-4 sm:mb-6">
        <h3 className="font-bold text-base sm:text-xl">커피 챗 시간 선택</h3>
        <Spacing size={16} />
        <h4 className="text-[#828282]">
          커피 챗이 가능한 날짜와 시간을 선택해주세요.
        </h4>
      </section>
      <DetailPageCalendarWrapper
        calendarComponent={<ReservationCalendar startTime={startTime} />}
        dataComponent={
          <>
            <SelectedReservationTime startTime={startTime} />
            <ReservationTypeInfo />
            <div className="flex w-full mt-5 text-center">
              <TimeOptions startTime={startTime} reservation={reservation} />
            </div>
          </>
        }
      />
    </section>
  )
}

export default ReservationForMentee
