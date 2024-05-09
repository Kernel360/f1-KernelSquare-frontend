"use client"

import Button from "@/components/shared/button/Button"
import ConfirmModal from "@/components/shared/confirm-modal/ConfirmModal"
import { useClientSession } from "@/hooks/useClientSession"
import useModal from "@/hooks/useModal"
import { CoffeeChatReservationDetailPayload } from "@/interfaces/dto/coffee-chat/coffeechat-reservation-detail.dto"
import AreaImage from "@/page/coding-meetings/main/info-area/AreaImage"
import dayjs from "dayjs"
// import dynamic from "next/dynamic"
import { useDeleteChatReservation } from "../reservation/mentee/hooks/useDeleteChatReservation"
import { isPenalty } from "@/util/chat/time"
import { useMatchedRoom } from "@/page/qna-detail/hooks/useMatchedRoom"
import { useParams } from "next/navigation"
import EnterCoffeeChatButton from "../EnterCoffeeChat/EnterCoffeeChatButton"

interface ChatAccessprops {
  coffeeChat: CoffeeChatReservationDetailPayload
}

// const EnterCoffeeChatButton = dynamic(
//   () => import("../EnterCoffeeChat/EnterCoffeeChatButton"),
//   {
//     ssr: false,
//     loading(loadingProps) {
//       return (
//         <button className="skeleton align-top flex-1 h-[inherit] p-1 sm:px-2 sm:py-1 sm:w-[107px] sm:h-10 sm:shrink-0 sm:flex-auto"></button>
//       )
//     },
//   },
// )

function ChatAccess({ coffeeChat }: ChatAccessprops) {
  const params = useParams()

  const { user } = useClientSession()
  const { openModal } = useModal()

  const { deleteChatReservationApi, deleteChatReservationApiStatus } =
    useDeleteChatReservation()

  const { matchedRoom, pending } = useMatchedRoom({
    coffeeChatId: Number(params.id),
  })

  const isCoffeeChatAuthor = user
    ? coffeeChat.member_id === user.member_id
    : false

  if (isCoffeeChatAuthor) return null

  if (pending) {
    return (
      <div className="flex gap-3 items-center">
        <AreaImage className="sm:block" />
        <span className={`text-[#7E8280] sm:text-primary sm:font-semibold`}>
          잠시만 기다려주세요
        </span>
      </div>
    )
  }

  if (!matchedRoom) {
    return (
      <div className="flex gap-3 items-center">
        <AreaImage className="sm:block" />
        <span className={`text-[#7E8280] sm:text-primary sm:font-semibold`}>
          커피 챗을 원하시면 예약을 진행해주세요
        </span>
      </div>
    )
  }

  const minute = dayjs(matchedRoom.start_time).get("minutes")

  const cancelReservationConfirm = () => {
    openModal({
      containsHeader: false,
      content: (
        <ConfirmModal.ModalContent
          onSuccess={() => {
            if (deleteChatReservationApiStatus === "pending") return

            deleteChatReservationApi({
              reservationId: matchedRoom.reservation_id,
            })
          }}
          situation={
            isPenalty({ time: matchedRoom.start_time })
              ? "deleteCoffeeChatAfterDue"
              : "deleteCoffeeChatBeforeDue"
          }
        />
      ),
    })
  }

  return (
    <div className="flex w-full flex-col gap-y-2 sm:flex-row sm:gap-x-3 sm:justify-between sm:items-center">
      <div className="flex sm:items-center">
        <AreaImage className="sm:block" />
        <div>
          <div>
            <span className="text-sm sm:text-base font-bold text-secondary sm:text-primary underline underline-offset-4">
              {dayjs(matchedRoom.start_time).format(
                minute === 0
                  ? "YYYY년MM월DD일 HH시"
                  : "YYYY년MM월DD일 HH시mm분",
              )}
            </span>
            <span className="text-sm font-bold sm:text-base text-secondary">{`에 예약된 일정이 있습니다.`}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-2 sm:items-center">
        <EnterCoffeeChatButton
          articleTitle={coffeeChat.title}
          roomId={matchedRoom.room_id}
          startTime={matchedRoom.start_time}
          reservation_id={matchedRoom.reservation_id}
          className="border [&:not(:disabled)]:border-secondary flex-1 bg-transparent hover:bg-transparent text-primary disabled:bg-transparent disabled:text-colorsGray sm:disabled:text-colorsDarkGray sm:disabled:bg-colorsGray sm:hover:bg-green-600 h-[inherit] p-1 sm:px-2 sm:py-1 sm:h-10 sm:w-max sm:shrink-0 sm:flex-auto sm:bg-primary sm:text-white"
        />
        <Button
          className="border border-secondary sm:border-transparent flex-1 h-[inherit] bg-transparent hover:bg-transparent text-secondary p-1 sm:w-max sm:px-2 sm:py-1 sm:h-10 sm:hover:text-danger sm:flex-auto sm:shrink-0"
          buttonTheme="secondary"
          onClick={cancelReservationConfirm}
        >
          취소하기
        </Button>
      </div>
    </div>
  )
}

export default ChatAccess
