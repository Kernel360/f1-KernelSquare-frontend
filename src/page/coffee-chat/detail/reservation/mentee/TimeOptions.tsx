"use client"

import { useRecoilState } from "recoil"
import { ScheduleListAtomFamily } from "@/recoil/atoms/coffee-chat/schedule"
import { twJoin } from "tailwind-merge"
import Button from "@/components/shared/button/Button"
import { getDate, getHour, getTime } from "@/util/getDate"
import {
  CoffeeChatReservationDetailPayload,
  CoffeeChatReservationTime,
} from "@/interfaces/dto/coffee-chat/coffeechat-reservation-detail.dto"
import { toast } from "react-toastify"
import {
  errorMessage,
  notificationMessage,
  successMessage,
} from "@/constants/message"
import useModal from "@/hooks/useModal"
import ConfirmModal from "@/components/shared/confirm-modal/ConfirmModal"
import { useClientSession } from "@/hooks/useClientSession"
import Image from "next/image"
import { Icons } from "@/components/icons/Icons"
import { Value } from "../CustomCalendar/Calendar.types"
import { CoffeeChatQueries } from "@/react-query/coffee-chat"
import { useParams } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import queryKey from "@/constants/queryKey"

type TimeOptionsProps = {
  selectedDay: string
  cate: "AM" | "PM"
  reservation: CoffeeChatReservationTime[]
  date: Value
}

const TimeOptions = ({ reservation, cate, date }: TimeOptionsProps) => {
  const { user } = useClientSession()
  const { openModal } = useModal()
  const { createCoffeeChatReservation } =
    CoffeeChatQueries.useCreateCoffeeChatReservation()
  const { deleteCoffeeChatReservation } =
    CoffeeChatQueries.useDeleteCoffeeChatReservation()
  const params = useParams<{ id: string }>()
  const queryClient = useQueryClient()

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

  // 목록에 이미 내가 예약한 커피챗이 있는지 검사
  const isAlreadyReservedByMe = reservation.some(
    (res) => res.mentee_nickname === user?.nickname,
  )

  const handleRegister = (
    time: CoffeeChatReservationTime,
    nickname: string | null,
  ) => {
    if (!user)
      return toast.error(errorMessage.unauthorized, {
        position: "top-center",
      })
    if (isAlreadyReservedByMe && nickname === user.nickname) {
      const confirmToDelete = () => {
        deleteCoffeeChatReservation(
          { reservationId: time.reservation_id },
          {
            onSuccess: () => {
              toast.success(successMessage.deleteCoffeeChatReservation, {
                position: "top-center",
                autoClose: 1000,
              })
              queryClient.invalidateQueries({
                queryKey: [queryKey.chat],
              })
            },
            onError: (res) => {
              toast.error(res.message, {
                position: "top-center",
                autoClose: 1000,
              })
            },
          },
        )
      }

      const cancleToDelete = () => {
        toast.error(notificationMessage.cancleReservation, {
          position: "top-center",
        })
      }
      return openModal({
        containsHeader: false,
        content: (
          <ConfirmModal.ModalContent
            onSuccess={confirmToDelete}
            onCancel={cancleToDelete}
            situation="deleteCoffeeChat"
          />
        ),
      })
    }

    if (isAlreadyReservedByMe)
      return toast.error(errorMessage.youAlreadyReserved, {
        position: "top-center",
      })

    if (nickname && nickname !== user.nickname)
      return toast.error(errorMessage.alreadyReserved, {
        position: "top-center",
      })
    else {
      const confirmToCreate = () => {
        createCoffeeChatReservation(
          {
            reservation_article_id: Number(params.id),
            reservation_id: time.reservation_id,
            member_id: user.member_id,
            start_time: time.start_time,
          },
          {
            onSuccess: () => {
              toast.success(successMessage.reserveCoffeeChat, {
                position: "top-center",
                autoClose: 1000,
              })
              queryClient.invalidateQueries({
                queryKey: [queryKey.chat],
              })
            },
            onError: (res) => {
              toast.error(res.message, {
                position: "top-center",
                autoClose: 1000,
              })
            },
          },
        )
      }

      const cancleToCreate = () => {
        toast.error(notificationMessage.cancleReservation, {
          position: "top-center",
        })
      }
      openModal({
        containsHeader: false,
        content: (
          <ConfirmModal.ModalContent
            onSuccess={confirmToCreate}
            onCancel={cancleToCreate}
            situation="reserveCoffeeChat"
          />
        ),
      })
    }
  }

  const isReserved = (mentee_nickname: string | null) =>
    twJoin(
      [
        "w-full flex py-2 rounded justify-center transition-colors break-all text-sm text-secondary font-semibold shadow-sm",
      ],
      [
        mentee_nickname === user?.nickname &&
          "cursor-default bg-primary text-white px-2 ",
      ],
      [
        user &&
          isAlreadyReservedByMe &&
          "cursor-default px-2 border-[1px] border-slate-200",
      ],
      [
        mentee_nickname &&
          mentee_nickname !== user?.nickname &&
          "cursor-default bg-slate-300 px-2",
      ],
      [!user && "cursor-default border-[1px] border-slate-200 px-6"],
      [
        user &&
          !mentee_nickname &&
          !isAlreadyReservedByMe &&
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
    <div className="w-full grid grid-cols-1 sm:grid-rows-4 sm:grid-cols-4 gap-4 shrink-0 m-auto">
      {getList(cate).map((time, i) => (
        <Button
          className={
            "inline text-left leading-[30px] p-0 flex items-center px-2"
          }
          key={time.room_id + i}
          onClick={() => handleRegister(time, time.mentee_nickname)}
        >
          <span className={isReserved(time.mentee_nickname)}>
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