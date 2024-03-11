"use client"

import { twJoin } from "tailwind-merge"
import Button from "@/components/shared/button/Button"
import { getDate, getHour, getTime } from "@/util/getDate"
import { CoffeeChatReservationTime } from "@/interfaces/dto/coffee-chat/coffeechat-reservation-detail.dto"
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
import { AxiosError } from "axios"
import { APIResponse } from "@/interfaces/dto/api-response"
import { revalidatePage } from "@/util/actions/revalidatePage"

type TimeOptionsProps = {
  selectedDay: string
  reservation: CoffeeChatReservationTime[]
  date: Value
}

const TimeOptions = ({ reservation, date }: TimeOptionsProps) => {
  const { user } = useClientSession()
  const { openModal } = useModal()
  const { createCoffeeChatReservation } =
    CoffeeChatQueries.useCreateCoffeeChatReservation()
  const { deleteCoffeeChatReservation } =
    CoffeeChatQueries.useDeleteCoffeeChatReservation()
  const params = useParams<{ id: string }>()
  const queryClient = useQueryClient()

  // 목록에 이미 내가 예약한 커피챗이 있는지 검사
  const isAlreadyReservedByMe = reservation.find(
    (res) => res.mentee_nickname === user?.nickname,
  )

  const handleRegister = (
    time: CoffeeChatReservationTime,
    nickname: string | null,
  ) => {
    if (!user)
      return toast.error(errorMessage.unauthorized, {
        toastId: "unauthorizedToRegister",
        position: "top-center",
      })
    // 본인이 예약한 커피챗 일정을 클릭했을 경우 예약 삭제를 원하는 것으로 간주
    if (isAlreadyReservedByMe && nickname === user.nickname) {
      const confirmToDelete = () => {
        deleteCoffeeChatReservation(
          { reservationId: time.reservation_id },
          {
            onSuccess: () => {
              toast.success(successMessage.deleteCoffeeChatReservation, {
                toastId: "successToDeleteReservation",
                position: "top-center",
              })
              setTimeout(() => {
                queryClient.resetQueries({
                  queryKey: [queryKey.chat],
                })
                revalidatePage("/chat/[id]", "page")
              }, 0)
            },
            onError: (error: Error | AxiosError<APIResponse>) => {
              if (error instanceof AxiosError) {
                const { response } = error as AxiosError<APIResponse>

                toast.error(response?.data.msg ?? errorMessage.failToReserve, {
                  toastId: "failToCancleReservation",
                  position: "top-center",
                })
                return
              }

              toast.error(errorMessage.failToCancleReservation, {
                toastId: "failToCancleReservation",
                position: "top-center",
              })
            },
          },
        )
      }

      return openModal({
        containsHeader: false,
        content: (
          <ConfirmModal.ModalContent
            onSuccess={confirmToDelete}
            situation="deleteCoffeeChatBeforeDue"
          />
        ),
      })
    }
    // 이미 해당 커피챗의 다른 시간을 예약했을 경우
    if (isAlreadyReservedByMe)
      return toast.error(errorMessage.youAlreadyReserved, {
        toastId: "youAlreadyReserved",
        position: "top-center",
      })

    // 다른 사람이 이미 예약한 시간대를 선택했을 경우
    if (nickname && nickname !== user.nickname)
      return toast.error(errorMessage.alreadyReserved, {
        toastId: "othersAlreadyReserved",
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
                toastId: "successToCreateReservation",
                position: "top-center",
              })
              setTimeout(() => {
                queryClient.resetQueries({
                  queryKey: [queryKey.chat],
                })
                revalidatePage("/chat/[id]", "page")
              }, 0)
              window.scrollTo({ top: 0 })
            },
            onError: (error: Error | AxiosError<APIResponse>) => {
              if (error instanceof AxiosError) {
                const { response } = error as AxiosError<APIResponse>

                toast.error(response?.data.msg ?? errorMessage.failToReserve, {
                  toastId: "failToCreateReservation",
                  position: "top-center",
                })
                return
              }

              toast.error(errorMessage.failToReserve, {
                toastId: "failToCreateReservation",
                position: "top-center",
              })
            },
          },
        )
      }

      const cancleToCreate = () => {
        toast.error(notificationMessage.cancleReservation, {
          toastId: "cancleCreateReservation",
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
        "w-[100px] flex py-2 rounded justify-center transition-colors break-all text-sm text-secondary font-semibold",
      ],
      [
        user &&
          isAlreadyReservedByMe &&
          "cursor-default border-[1px] border-colorsGray",
      ],
      [
        mentee_nickname &&
          mentee_nickname !== user?.nickname &&
          "cursor-default bg-colorsGray",
      ],
      [!user && "cursor-default border-[1px] border-colorsGray"],
      [
        user &&
          !mentee_nickname &&
          !isAlreadyReservedByMe &&
          "border-[1px] border-slate-200 bg-white cursor-pointer bg-colorsLightGray hover:bg-colorsGray",
      ],
    )

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
            onClick={() => handleRegister(time, time.mentee_nickname)}
            disabled={!!time.mentee_nickname}
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
