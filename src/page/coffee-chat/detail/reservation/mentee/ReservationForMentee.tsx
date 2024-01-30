"use client"

import { getDate, getHour, getTime } from "@/util/getDate"
import useModal from "@/hooks/useModal"
import ConfirmModal from "@/components/shared/confirm-modal/ConfirmModal"
import { toast } from "react-toastify"
import { notificationMessage } from "@/constants/message"
import { useProgressModal } from "@/hooks/useProgressModal"
import { useParams } from "next/navigation"
import { mockCoffeeChatReservations } from "@/mocks/db/coffee-chat"
import CustomCalendar from "../CustomCalendar/CustomCalendar"
import { useState } from "react"
import type { Value } from "../CustomCalendar/Calendar.types"

function ReservationForMentee() {
  const [date, setDate] = useState<Value>(new Date())
  const params = useParams<{ id: string }>()
  const targetChat = mockCoffeeChatReservations[Number(params.id)]
  const AM = targetChat.date_times.filter(
    ({ start_time }) => Number(getHour(start_time)) < 12,
  )
  const PM = targetChat.date_times.filter(
    ({ start_time }) => Number(getHour(start_time)) >= 12,
  )
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
      <CustomCalendar
        start={targetChat.created_date}
        date={date}
        setDate={setDate}
      />
      <div className="my-10 text-xl text-secondary font-bold">
        {getDate({ date: date + "" })}
      </div>
      <div className="flex justify-around">
        <div>
          <div className="font-bold text-primary text-lg mb-5">오전</div>
          <div className="grid grid-cols-2 sm:grid-rows-4 gap-4">
            {AM.map((date, i) => (
              <div
                className="border-[1px] border-slate-200 px-6 py-2 rounded cursor-pointer hover:bg-slate-100"
                key={date.room_id + i}
                onClick={handleRegister}
              >
                {getTime(date.start_time)}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="font-bold text-primary text-lg mb-5">오후</div>
          <div className="grid grid-cols-2 sm:grid-rows-4 gap-4">
            {PM.map((date, i) => (
              <div
                className="border-[1px] border-slate-200 px-6 py-2 rounded cursor-pointer hover:bg-slate-100"
                key={date.room_id + i}
                onClick={handleRegister}
              >
                {getTime(date.start_time)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReservationForMentee
