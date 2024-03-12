"use client"

import { twJoin } from "tailwind-merge"
import Button from "@/components/shared/button/Button"
import { getDate, getTime } from "@/util/getDate"
import { CoffeeChatReservationTime } from "@/interfaces/dto/coffee-chat/coffeechat-reservation-detail.dto"
import { useClientSession } from "@/hooks/useClientSession"
import Image from "next/image"
import { Icons } from "@/components/icons/Icons"
import { Value } from "../CustomCalendar/Calendar.types"
import useReservationForMentee from "./hooks/useReservationForMentee"

type TimeOptionsProps = {
  selectedDay: string
  reservation: CoffeeChatReservationTime[]
  date: Value
}

const TimeOptions = ({ reservation, date }: TimeOptionsProps) => {
  const { user } = useClientSession()
  const { handleRegister, filterTime } = useReservationForMentee()

  // 목록에 이미 내가 예약한 커피챗이 있는지 검사
  const isAlreadyReservedByMe = reservation.some(
    (res) => res.mentee_nickname === user?.nickname,
  )

  // 지난 시간은 선택되지 않게 하기
  const isReserved = (mentee_nickname: string | null, time: string) =>
    twJoin(
      [
        "w-[100px] flex py-2 rounded justify-center transition-colors break-all text-sm text-secondary font-semibold",
      ],
      // 이미 지난 시간
      [filterTime(time) && "cursor-default bg-colorsGray"],
      // 다른 시간에 예약이 있는 커피챗
      [
        user &&
          isAlreadyReservedByMe &&
          "cursor-default border-[1px] border-colorsGray",
      ],
      // 다른 사람이 예약한 시간
      [
        mentee_nickname &&
          mentee_nickname !== user?.nickname &&
          "cursor-default bg-colorsGray",
      ],
      // 로그인 안 한 사용자
      [!user && "cursor-default border-[1px] border-colorsGray"],
      // 예약 가능한 시간
      [
        user &&
          !mentee_nickname &&
          !isAlreadyReservedByMe &&
          "border-[1px] border-slate-200 bg-white cursor-pointer bg-colorsLightGray hover:bg-colorsGray",
      ],
    )

  // 해당 일자에 멘토링 일정이 없는 경우
  if (
    !reservation.filter(
      ({ start_time }) =>
        getDate({ date: date + "" }) === getDate({ date: start_time }),
    ).length
  )
    return (
      <div className="w-full sm:w-[448px] text-center text-slate-300">
        가능한 멘토링 일정이 없습니다.
      </div>
    )

  return (
    <div className="w-full grid grid-cols-1 sm:grid-rows-4 sm:grid-cols-4 gap-4 shrink-0 m-auto">
      {reservation
        .filter(
          ({ start_time }) =>
            getDate({ date: date + "" }) === getDate({ date: start_time }),
        )
        .map((time, i) => (
          <Button
            className={
              "text-left p-0 leading-[30px] flex items-center disabled:bg-colorsGray disabled:text-colorsDarkGray rounded"
            }
            key={time.room_id + i}
            onClick={() =>
              handleRegister(time, time.mentee_nickname, isAlreadyReservedByMe)
            }
            disabled={!!time.mentee_nickname}
          >
            <span className={isReserved(time.mentee_nickname, time.start_time)}>
              {time.mentee_image_url && (
                <ProfileImage image_url={time.mentee_image_url} />
              )}
              {time.mentee_nickname && !time.mentee_image_url && (
                <div className="w-[20px] h-[20px] mr-1 mt-[2px]">
                  <Icons.UserProfile />
                </div>
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
