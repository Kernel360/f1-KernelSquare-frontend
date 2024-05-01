import ConfirmModal from "@/components/shared/confirm-modal/ConfirmModal"
import cancleMessage from "@/constants/message/cancle"
import { errorMessage } from "@/constants/message/error"
import notificationMessage from "@/constants/message/notification"
import successMessage from "@/constants/message/success"
import { validationMessage } from "@/constants/message/validation"
import queryKey from "@/constants/queryKey"
import { useClientSession } from "@/hooks/useClientSession"
import useModal from "@/hooks/useModal"
import { APIResponse } from "@/interfaces/dto/api-response"
import type { CoffeeChatReservationTime } from "@/interfaces/dto/coffee-chat/coffeechat-reservation-detail.dto"
import { CoffeeChatQueries } from "@/react-query/coffee-chat"
import { revalidatePage } from "@/util/actions/revalidatePage"
import { useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import dayjs from "dayjs"
import { useParams } from "next/navigation"
import { toast } from "react-toastify"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"
dayjs.extend(isSameOrAfter)

const useReservationForMentee = () => {
  const { data } = CoffeeChatQueries.useGetMyCoffeeChatReservation()
  const { user } = useClientSession()
  const { openModal } = useModal()
  const { createCoffeeChatReservation } =
    CoffeeChatQueries.useCreateCoffeeChatReservation()
  const { deleteCoffeeChatReservation } =
    CoffeeChatQueries.useDeleteCoffeeChatReservation()
  const params = useParams<{ id: string }>()
  const queryClient = useQueryClient()

  const filterTime = (time: string) => dayjs().isSameOrAfter(time, "m")

  const handleRegister = (
    time: CoffeeChatReservationTime,
    nickname: string | null,
    isAlreadyReservedByMe: boolean,
  ) => {
    if (!user)
      return toast.error(notificationMessage.unauthorized, {
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

                toast.error(
                  response?.data.msg ?? errorMessage.reserveCoffeeChat,
                  {
                    toastId: "failToCancleReservation",
                    position: "top-center",
                  },
                )
                return
              }

              toast.error(errorMessage.cancleReservation, {
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
    // 지난 시간을 예약했을 경우
    if (filterTime(time.start_time))
      return toast.error(validationMessage.beforeNow, {
        toastId: "beforeNow",
        position: "top-center",
      })

    // 이미 해당 커피챗의 다른 시간을 예약했을 경우
    if (isAlreadyReservedByMe)
      return toast.error(validationMessage.youAlreadyReserved, {
        toastId: "youAlreadyReserved",
        position: "top-center",
      })

    // 다른 사람이 이미 예약한 시간대를 선택했을 경우
    if (nickname && nickname !== user.nickname)
      return toast.error(validationMessage.alreadyReserved, {
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
            reservation_start_time: time.start_time,
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

                toast.error(
                  response?.data.msg ?? errorMessage.reserveCoffeeChat,
                  {
                    toastId: "failToCreateReservation",
                    position: "top-center",
                  },
                )
                return
              }

              toast.error(errorMessage.reserveCoffeeChat, {
                toastId: "failToCreateReservation",
                position: "top-center",
              })
            },
          },
        )
      }

      const cancleToCreate = () => {
        toast.error(cancleMessage.createReservation, {
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

  return {
    myReservations: data?.data.data?.reservation_responses,
    filterTime,
    handleRegister,
  }
}

export default useReservationForMentee
