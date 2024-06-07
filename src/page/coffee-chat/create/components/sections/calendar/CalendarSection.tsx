import { useRecoilValue } from "recoil"
import ChatScheduleCalendar from "../../../calendar/ChatScheduleCalendar"
import { ReservationSelectedDateAtom } from "@/recoil/atoms/coffee-chat/date"
import PeriodTypeInfo from "@/page/coffee-chat/detail/reservation/calendar/type-info/PeriodTypeInfo"
import dayjs from "dayjs"

interface CalendarSectionProps {
  initialDateTime?: string[]
}

function CalendarSection({ initialDateTime }: CalendarSectionProps) {
  const selectedDate = useRecoilValue(ReservationSelectedDateAtom)

  return (
    <section>
      <ChatScheduleCalendar
        initialStartDate={
          initialDateTime?.length
            ? dayjs(initialDateTime[0]).toDate()
            : undefined
        }
      />
      {selectedDate ? <PeriodTypeInfo /> : null}
    </section>
  )
}

export default CalendarSection
