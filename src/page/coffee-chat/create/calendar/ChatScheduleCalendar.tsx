"use client"

import dayjs from "dayjs"
import { CalendarProps, TileArgs } from "react-calendar"
import ReservationCalendarBase from "../../detail/reservation/calendar-base/ReservationCalendarBase"
import { useSelectedChatTime } from "../hooks/useSelectedChatTime"
import { useCoffeeChatFormContext } from "../../hooks/useCoffeeChatFormContext"
import useModal from "@/hooks/useModal"
import Button from "@/components/shared/button/Button"
import Spacing from "@/components/shared/Spacing"

interface ChatScheduleCanlendarProps {
  initialStartDate?: Date
}

function ChatScheduleCalendar({
  initialStartDate,
}: ChatScheduleCanlendarProps) {
  const { dateTimeFieldArray } = useCoffeeChatFormContext()
  const { selectedDate, setSelectedDate, coffeeChatPeriods } =
    useSelectedChatTime()

  const { openModal, closeModal } = useModal()

  const startDate = dayjs().add(7, "days").startOf("days").toDate()

  const onDateChange: NonNullable<CalendarProps["onChange"]> = (
    value,
    event,
  ) => {
    if (selectedDate && dayjs(value as Date).isSame(selectedDate as Date)) {
      return
    }

    if (selectedDate) {
      openModal({
        containsHeader: false,
        closeableDim: false,
        content: (
          <ConfirmChangeDateModal
            targetDate={value as Date}
            onAgree={() => {
              dateTimeFieldArray.clearDateTime()
              setSelectedDate(value)

              closeModal()
            }}
            onCancel={closeModal}
          />
        ),
      })

      return
    }

    setSelectedDate(value)
  }

  const tileClassname = ({ date }: TileArgs) => {
    const prefix = "action--create"

    if (!selectedDate) return undefined

    const { reservationPossible, reservationConfirm, chat } = coffeeChatPeriods!

    if (
      dayjs(date).isBetween(
        reservationPossible.start,
        reservationPossible.end,
        "minutes",
        "[]",
      )
    ) {
      return `${prefix} reservation-possible`
    }
    if (dayjs(date).isSame(reservationConfirm)) {
      return `${prefix} reservation-confirm`
    }
    if (dayjs(date).isBetween(chat.start, chat.end, "minutes", "[]")) {
      return `${prefix} mentoring`
    }

    return undefined
  }

  return (
    <ReservationCalendarBase
      start={startDate}
      limit={21}
      minDate={
        initialStartDate
          ? dayjs(initialStartDate).startOf("days").toDate()
          : startDate
      }
      date={selectedDate}
      onDateChange={onDateChange}
      tileClassName={tileClassname}
      tileDisabled={({ date }) => {
        return dayjs(date).isBefore(dayjs().add(7, "days").startOf("days"))
      }}
    />
  )
}

export default ChatScheduleCalendar

const ConfirmChangeDateModal = ({
  targetDate,
  onAgree,
  onCancel,
}: {
  targetDate: Date
  onAgree: () => void
  onCancel: () => void
}) => {
  return (
    <div className="w-full sm:w-[400px] bg-white">
      <div className="flex flex-col w-full gap-y-2 justify-center">
        <div className="font-bold inline-block align-top mx-auto">
          커피챗 시작 일시를 &nbsp;
          <span className="text-primary">
            {dayjs(targetDate).format("YYYY년 M월 D일")}
          </span>
          &nbsp; 로 변경하시겠습니까?
        </div>
        <div className="text-orange-400 text-xs inline-block align-top mx-auto">
          기간이 재설정되어 선택한 일시가 초기화 될 수 있습니다.
        </div>
      </div>
      <Spacing size={16} />
      <div className="flex w-full justify-center gap-x-3">
        <Button buttonTheme="primary" onClick={onAgree}>
          확인
        </Button>
        <Button
          buttonTheme="third"
          className="border-transparent hover:bg-light-green hover:text-secondary"
          onClick={onCancel}
        >
          취소
        </Button>
      </div>
    </div>
  )
}
