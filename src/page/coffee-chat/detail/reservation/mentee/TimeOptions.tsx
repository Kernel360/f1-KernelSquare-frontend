"use client"

import { useRecoilState } from "recoil"
import { ScheduleListAtomFamily } from "@/recoil/atoms/coffee-chat/schedule"
import { twJoin } from "tailwind-merge"
import Button from "@/components/shared/button/Button"
import { getDate, getHour, getTime } from "@/util/getDate"
import { CoffeeChatReservationTime } from "@/interfaces/dto/coffee-chat/coffeechat-reservation-detail.dto"
import { toast } from "react-toastify"
import { errorMessage, notificationMessage } from "@/constants/message"
import useModal from "@/hooks/useModal"
import ConfirmModal from "@/components/shared/confirm-modal/ConfirmModal"
import { useClientSession } from "@/hooks/useClientSession"
import Image from "next/image"
import { Icons } from "@/components/icons/Icons"
import { Value } from "../CustomCalendar/Calendar.types"

type TimeOptionsProps = {
  selectedDay: string
  cate: "AM" | "PM"
  reservation: CoffeeChatReservationTime[]
  date: Value
}

const TimeOptions = ({
  reservation,
  selectedDay,
  cate,
  date,
}: TimeOptionsProps) => {
  const { user } = useClientSession()
  const { openModal } = useModal()

  const AM = reservation.filter(
    ({ start_time }) =>
      getDate({ date: date + "" }) === getDate({ date: start_time }) &&
      Number(getHour(start_time)) < 12,
  )

  const PM = reservation.filter(
    ({ start_time }) =>
      getDate({ date: date + "" }) === getDate({ date: start_time }) &&
      Number(getHour(start_time)) >= 12,
  )

  const getList = (cate: "AM" | "PM") => {
    switch (cate) {
      case "AM":
        return AM
      case "PM":
        return PM
      default:
        return AM
    }
  }

  const handleRegister = (time: string, nickname: string | null) => {
    if (!user)
      return toast.error(errorMessage.unauthorized, {
        position: "top-center",
      })
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
      [
        "flex py-2 rounded justify-center transition-colors break-all text-sm text-secondary font-semibold shadow-sm",
      ],
      [
        menti_nickname === user?.nickname &&
          "cursor-default bg-primary text-white px-2 ",
      ],
      [
        menti_nickname &&
          menti_nickname !== user?.nickname &&
          "cursor-default bg-slate-300 px-2",
      ],
      [!user && "cursor-default border-[1px] border-slate-200 px-6"],
      [
        user &&
          !menti_nickname &&
          "border-[1px] border-slate-200 bg-white cursor-pointer bg-colorsLightGray hover:bg-colorsGray px-6 ",
      ],
    )

  if (!getList(cate).length)
    return (
      <div className="w-full sm:w-[500px] text-center text-slate-300">
        가능한 시간대가 없습니다.
      </div>
    )

  return (
    <div className="grid grid-cols-1 sm:grid-rows-4 sm:grid-cols-4 gap-4 shrink-0 m-auto">
      {getList(cate).map((time, i) => (
        <Button
          className={"inline text-left leading-[30px] p-0"}
          key={time.room_id + i}
          onClick={() => handleRegister(time.start_time, time.menti_nickname)}
        >
          <span className={isReserved(time.menti_nickname)}>
            {time.menti_image_url && (
              <ProfileImage image_url={time.menti_image_url} />
            )}
            {time.menti_nickname && !time.menti_image_url && (
              <Icons.UserProfile />
            )}
            <div>{getTime(time.start_time)}</div>
          </span>
        </Button>
      ))}
    </div>
  )
}

export default TimeOptions

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
