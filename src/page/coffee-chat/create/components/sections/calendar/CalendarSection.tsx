import { useRecoilValue } from "recoil"
import ChatScheduleCalendar from "../../../calendar/ChatScheduleCalendar"
import { ReservationSelectedDateAtom } from "@/recoil/atoms/coffee-chat/date"
import PeriodTypeInfo from "@/page/coffee-chat/detail/reservation/calendar/type-info/PeriodTypeInfo"

function CalendarSection() {
  const selectedDate = useRecoilValue(ReservationSelectedDateAtom)

  return (
    <section>
      <ChatScheduleCalendar />
      {selectedDate ? <PeriodTypeInfo /> : null}
    </section>
  )
}

export default CalendarSection
