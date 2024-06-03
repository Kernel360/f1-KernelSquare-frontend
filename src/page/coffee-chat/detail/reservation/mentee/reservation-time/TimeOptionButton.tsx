"use client"

import { Icons } from "@/components/icons/Icons"
import Button from "@/components/shared/button/Button"
import { CoffeeChatReservationTime } from "@/interfaces/dto/coffee-chat/coffeechat-reservation-detail.dto"
import { SessionPayload } from "@/recoil/atoms/user"
import { getTime } from "@/util/getDate"
import dayjs from "dayjs"
import Image from "next/image"
import { twMerge } from "tailwind-merge"
import { useCreateChatReservation } from "../hooks/useCreateChatReservation"
import { useDeleteChatReservation } from "../hooks/useDeleteChatReservation"
import { toast } from "react-toastify"
import useModal from "@/hooks/useModal"
import ConfirmModal from "@/components/shared/confirm-modal/ConfirmModal"
import cancelMessage from "@/constants/message/cancel"
import { MatchedRoom } from "@/interfaces/coffee-chat"
import { isPenalty } from "@/util/chat/time"

interface TimeOptionButtonProps {
  user: SessionPayload
  articleId: number
  reservationInfo: CoffeeChatReservationTime
  matchedRoom: MatchedRoom | null
}

function TimeOptionButton({
  user,
  articleId,
  reservationInfo,
  matchedRoom,
}: TimeOptionButtonProps) {
  const { openModal } = useModal()

  const { createChatReservationApi, createChatReservationApiStatus } =
    useCreateChatReservation()

  const { deleteChatReservationApi, deleteChatReservationApiStatus } =
    useDeleteChatReservation()

  const isReservedByMe =
    reservationInfo.reservation_id === matchedRoom?.reservation_id
  const hasReservation = !!matchedRoom

  const isAfter = dayjs().startOf("seconds").isAfter(reservationInfo.start_time)

  const isDisabled = () => {
    if (!isReservedByMe && isAfter) return true
    if (reservationInfo.mentee_nickname && !isReservedByMe) return true

    return false
  }

  const classNames = twMerge([
    "w-full h-[38px] shadow-sm gap-0.5 justify-center items-center p-0 rounded bg-white border border-colorsGray disabled:bg-colorsGray disabled:text-colorsDarkGray hover:bg-colorsLightGray",
    isReservedByMe && "bg-info",
  ])

  const handleTimeClick = () => {
    if (
      createChatReservationApiStatus === "pending" ||
      deleteChatReservationApiStatus === "pending"
    )
      return

    // 본인이 예약한 커피챗 일정을 클릭했을 경우 예약 삭제 confirm
    if (isReservedByMe) {
      openModal({
        containsHeader: false,
        content: (
          <ConfirmModal.ModalContent
            onSuccess={() =>
              deleteChatReservationApi({
                reservationId: reservationInfo.reservation_id,
              })
            }
            situation={
              isPenalty({ time: matchedRoom.start_time })
                ? "deleteCoffeeChatAfterDue"
                : "deleteCoffeeChatBeforeDue"
            }
          />
        ),
      })

      return
    }

    // 지난 시간을 예약했을 경우
    if (isAfter) {
      toast.error("지난 시간의 커피챗은 예약할 수 없습니다.", {
        toastId: "beforeNow",
        position: "top-center",
      })

      return
    }

    // 이미 해당 커피챗의 다른 시간을 예약했을 경우
    if (hasReservation) {
      toast.error("예약된 시간대가 있어 커피챗을 예약할 수 없습니다", {
        toastId: "youAlreadyReserved",
        position: "top-center",
      })
      return
    }

    // 다른 사람이 이미 예약한 시간대를 선택했을 경우
    if (!!user && reservationInfo.mentee_nickname && !isReservedByMe) {
      toast.error("이미 예약된 시간대입니다", {
        toastId: "othersAlreadyReserved",
        position: "top-center",
      })

      return
    }

    if (!user) {
      toast.error("로그인 후 예약이 가능합니다", {
        toastId: "notLogined",
        position: "top-center",
      })
      return
    }

    // 커피챗 예약
    openModal({
      containsHeader: false,
      content: (
        <ConfirmModal.ModalContent
          onSuccess={() =>
            createChatReservationApi({
              reservation_article_id: articleId,
              reservation_id: reservationInfo.reservation_id,
              member_id: user?.member_id ?? -1,
              reservation_start_time: reservationInfo.start_time,
            })
          }
          onCancel={() => {
            toast.error(cancelMessage.createReservation, {
              toastId: "cancleCreateReservation",
              position: "top-center",
            })
          }}
          situation="reserveCoffeeChat"
        />
      ),
    })
  }

  return (
    <Button
      className={classNames}
      disabled={isDisabled()}
      onClick={handleTimeClick}
    >
      <ReservationUserProfile reservationInfo={reservationInfo} />
      <time className="text-sm text-secondary font-semibold">
        {getTime(reservationInfo.start_time)}
      </time>
    </Button>
  )
}

export default TimeOptionButton

const ReservationUserProfile = ({
  reservationInfo,
}: {
  reservationInfo: CoffeeChatReservationTime
}) => {
  if (!reservationInfo.mentee_nickname) return null

  if (reservationInfo.mentee_image_url === null) {
    return (
      <div className="relative w-[20px] h-[20px] rounded-full overflow-hidden">
        <Icons.UserProfile className="text-xl" />
      </div>
    )
  }

  return (
    <div className="relative w-[20px] h-[20px] rounded-full overflow-hidden">
      <Image
        src={reservationInfo.mentee_image_url}
        fill
        alt="예약자 프로필 이미지"
        className="object-cover"
      />
    </div>
  )
}
