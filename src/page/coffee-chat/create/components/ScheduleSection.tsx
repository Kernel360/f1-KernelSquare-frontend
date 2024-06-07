"use client"

import CoffeeChatSection from "./CoffeeChatSection"
import { useRecoilValue } from "recoil"
import DetailPageCalendarWrapper from "../../detail/reservation/DetailPageCalendarWrapper"
import CalendarSection from "./sections/calendar/CalendarSection"
import DateSection from "./sections/date/DateSection"
import { ReservationSelectedDateAtom } from "@/recoil/atoms/coffee-chat/date"
import HelpHoverBox from "./sections/HelpHoverBox"
import SelectedTimeList from "./SelectedTimeList"
import { useDomainEditMode } from "@/hooks/editor/useDomainEditMode"

interface SheduleSectionProps {
  initialDateTime?: string[]
}

const ScheduleSection = ({ initialDateTime }: SheduleSectionProps) => {
  const editMode = useDomainEditMode()

  const selectedDate = useRecoilValue(ReservationSelectedDateAtom)

  return (
    <CoffeeChatSection>
      <CoffeeChatSection.Label className="w-max max-w-full flex flex-wrap items-center gap-2">
        <div>일시</div>
        {selectedDate && editMode !== "update" && <HelpHoverBox />}
      </CoffeeChatSection.Label>
      <section className="my-2 py-2 bg-light-green">
        <SelectedTimeList />
      </section>
      {editMode === "update" ? null : (
        <DetailPageCalendarWrapper
          classNames={{
            dataComponent: {
              container: "mt-3 sm:mt-0",
            },
          }}
          calendarComponent={
            <CalendarSection initialDateTime={initialDateTime} />
          }
          dataComponent={<DateSection />}
        />
      )}
    </CoffeeChatSection>
  )
}

export default ScheduleSection
