"use client"

import { getDate, getDay } from "@/util/getDate"
import { useState } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import "../Calendar.css"
import useModal from "@/hooks/useModal"
import ConfirmModal from "@/components/shared/confirm-modal/ConfirmModal"
import { toast } from "react-toastify"
import { notificationMessage } from "@/constants/message"
import { useProgressModal } from "@/hooks/useProgressModal"

type ValuePiece = Date | null

type Value = ValuePiece | [ValuePiece, ValuePiece]

function ReservationForMentee() {
  const [date, setDate] = useState<Value>(new Date())
  // ui 구현용 임시 배열
  const mockArr = [
    "11:00",
    "11:00",
    "11:00",
    "11:00",
    "11:00",
    "11:00",
    "11:00",
  ]
  const { openModal } = useModal()
  const { ProgressModalView } = useProgressModal()
  const handleRegister = () => {
    const onSuccess = () => {}

    const onCancel = () => {
      toast.error(notificationMessage.cancleReservation, {
        position: "top-center",
      })
    }
    openModal({
      containsHeader: false,
      content: (
        <ConfirmModal.ModalContent
          onSuccess={onSuccess}
          onCancel={onCancel}
          situation="reserveCoffeeChat"
        />
      ),
    })
  }

  return (
    <section className="text-center mb-20">
      <ProgressModalView />
      <div className="font-bold text-primary text-[28px] mb-5">SCHEDULE</div>
      <div className="react-calendar">
        <Calendar
          locale="ko"
          onChange={setDate}
          value={date}
          // 숫자만 보이게 설정
          formatDay={(_, date) => getDay(date)}
          navigationLabel={undefined}
          minDetail="month"
          maxDetail="month"
          className={"mx-auto text-sm border-white"}
          // 날짜 타일에 추가할 컨텐츠
          // tileContent={}
        />
      </div>
      <div className="my-10 text-xl text-secondary font-bold">
        {getDate({ date: date + "" })}
      </div>
      <div className="flex justify-around">
        <div>
          <div className="font-bold text-primary text-lg mb-5">오전</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {mockArr.map((date, i) => (
              <div
                className="border-[1px] border-slate-200 px-6 py-2 rounded cursor-pointer hover:bg-slate-100"
                key={date + i}
                onClick={handleRegister}
              >
                {date}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="font-bold text-primary text-lg mb-5">오후</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {mockArr.map((date, i) => (
              <div
                className="border-[1px] border-slate-200 px-6 py-2 rounded cursor-pointer hover:bg-slate-100"
                key={date + i}
                onClick={handleRegister}
              >
                {date}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReservationForMentee
