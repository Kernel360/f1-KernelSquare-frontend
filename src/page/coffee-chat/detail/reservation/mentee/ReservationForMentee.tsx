"use client"

import { getDate, getHour, getTime } from "@/util/getDate"
import useModal from "@/hooks/useModal"
import ConfirmModal from "@/components/shared/confirm-modal/ConfirmModal"
import { toast } from "react-toastify"
import { errorMessage, notificationMessage } from "@/constants/message"
import { useProgressModal } from "@/hooks/useProgressModal"
import { useParams } from "next/navigation"
import { mockCoffeeChatReservations } from "@/mocks/db/coffee-chat"
import CustomCalendar from "../CustomCalendar/CustomCalendar"
import { useState } from "react"
import type { Value } from "../CustomCalendar/Calendar.types"
import Image from "next/image"
import { basic_profile } from "@/assets/images/basic"
import { CoffeeChatReservationTime } from "@/interfaces/dto/coffee-chat/coffeechat-reservation-detail.dto"
import { twJoin } from "tailwind-merge"
import { useClientSession } from "@/hooks/useClientSession"

function ReservationForMentee() {
  const params = useParams<{ id: string }>()
  const targetChat = mockCoffeeChatReservations[Number(params.id) - 1]
  // 데이터 받아오면 시작 날짜로 수정 필요
  const [date, setDate] = useState<Value>(new Date(targetChat.created_date))
  // 데이터 받아오면 실제 일정으로 수정 필요
  const AM = targetChat.date_times.filter(
    ({ start_time }) => Number(getHour(start_time)) < 12,
  )
  const PM = targetChat.date_times.filter(
    ({ start_time }) => Number(getHour(start_time)) >= 12,
  )
  const { ProgressModalView } = useProgressModal()

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
          <TimeOptions date={AM} />
        </div>
        <div>
          <div className="font-bold text-primary text-lg mb-5">오후</div>
          <TimeOptions date={PM} />
        </div>
      </div>
    </section>
  )
}

export default ReservationForMentee

type TimeOptionsProps = { date: CoffeeChatReservationTime[] }

function TimeOptions({ date }: TimeOptionsProps) {
  const { openModal } = useModal()
  const { user } = useClientSession()
  const handleRegister = (nickname: string | null) => {
    if (!user)
      return toast.error(errorMessage.unauthorized, { position: "top-center" })
    if (nickname)
      return toast.error(errorMessage.alreadyReserved, {
        position: "top-center",
      })
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

  const isReserved = (menti_nickname: string | null) =>
    twJoin(
      ["flex border-[1px] border-slate-200 px-6 py-2 rounded justify-center"],
      [menti_nickname && "bg-slate-200"],
      [!user && "cursor-default"],
      [user && !menti_nickname && "hover:bg-slate-100 cursor-pointer"],
    )

  return (
    <div className="grid grid-cols-1 sm:grid-rows-4 sm:grid-cols-3 gap-4 shrink-0">
      {date.map((date, i) => (
        <div
          className={isReserved(date.menti_nickname)}
          key={date.room_id + i}
          onClick={() => handleRegister(date.menti_nickname)}
        >
          {date.menti_nickname && (
            <ProfileImage image_url={date.menti_image_url || basic_profile} />
          )}
          <div> {getTime(date.start_time)}</div>
        </div>
      ))}
    </div>
  )
}

type ProfileImageProps = { image_url: string }

function ProfileImage({ image_url }: ProfileImageProps) {
  return (
    <div className="relative w-[20px] h-[20px] rounded mr-1">
      <Image
        src={image_url}
        fill
        alt="예약자 프로필 이미지"
        className="object-cover rounded-full mt-[2px]"
      />
    </div>
  )
}
