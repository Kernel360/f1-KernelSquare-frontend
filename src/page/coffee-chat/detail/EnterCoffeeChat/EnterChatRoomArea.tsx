import LoginForm from "@/components/form/LoginForm"
import Button from "@/components/shared/button/Button"
import PageInfoArea from "@/components/shared/page-template/page-info-area/PageInfoArea"
import useModal from "@/hooks/useModal"
import CodingMeetingAreaImage from "@/page/coding-meetings/main/info-area/AreaImage"
import { twMerge } from "tailwind-merge"
import EnterCoffeeChatButton, {
  EnterCoffeeChatProps,
} from "./EnterCoffeeChatButton"
import { getKorExactTime } from "@/util/getDate"
import { CoffeeChatQueries } from "@/react-query/coffee-chat"
import { toast } from "react-toastify"
import { errorMessage, successMessage } from "@/constants/message"
import { useQueryClient } from "@tanstack/react-query"
import queryKey from "@/constants/queryKey"
import { revalidatePage } from "@/util/actions/revalidatePage"
import { AxiosError } from "axios"
import { APIResponse } from "@/interfaces/dto/api-response"
import ConfirmModal from "@/components/shared/confirm-modal/ConfirmModal"
import { useProgressModal } from "@/hooks/useProgressModal"
import dayjs from "dayjs"

type EnterChatRoomArea = EnterCoffeeChatProps & {}

function EnterChatRoomArea({
  articleTitle,
  roomId,
  startTime,
  reservation_id,
}: EnterChatRoomArea) {
  const wrapperClassNames = twMerge([
    `flex w-full justify-between items-center bg-[#EAF7F0] rounded-md overflow-hidden border border-transparent sm:border-[#E0E0E0]`,
    `p-4`,
    `sm:p-0 sm:bg-white sm:pr-[2%]`,
  ])

  return (
    <PageInfoArea className={wrapperClassNames}>
      <PageInfoArea.NotLoginedUserArea>
        <NotLoginedUserArea />
      </PageInfoArea.NotLoginedUserArea>
      <PageInfoArea.LoginedUserArea>
        <LoginedUserArea
          articleTitle={articleTitle}
          roomId={roomId}
          startTime={startTime}
          reservation_id={reservation_id}
        />
      </PageInfoArea.LoginedUserArea>
    </PageInfoArea>
  )
}

export default EnterChatRoomArea

function NotLoginedUserArea() {
  const { openModal } = useModal()

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) =>
    openModal({
      content: <LoginForm />,
    })

  return (
    <>
      <div className="flex items-center">
        <CodingMeetingAreaImage />
        <AreaText logined={false} />
      </div>
      <Button
        className="px-6 py-4 w-max shrink-0 font-semibold text-sm underline bg-transparent sm:bg-primary sm:no-underline sm:text-white"
        onClick={handleLogin}
      >
        로그인 하기
      </Button>
    </>
  )
}

function LoginedUserArea({
  articleTitle,
  roomId,
  startTime,
  reservation_id,
}: EnterCoffeeChatProps) {
  const { deleteCoffeeChatReservation } =
    CoffeeChatQueries.useDeleteCoffeeChatReservation()
  const queryClient = useQueryClient()
  const { ProgressModalView } = useProgressModal()
  const { openModal } = useModal()
  const isBeforeDue = () => {
    const date1 = dayjs(startTime, "YYYY-MM-DD")
    const date2 = dayjs(new Date(), "YYYY-MM-DD")
    if (
      date2.diff(date1, "day") === -1 ||
      (date2.diff(date1, "day") >= 0 && date2.diff(date1, "day") < 2)
    )
      return true
    return false
  }

  const handleCancleReservation = () => {
    const confirmToDelete = () => {
      deleteCoffeeChatReservation(
        { reservationId: reservation_id },
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
          situation={
            isBeforeDue()
              ? "deleteCoffeeChatBeforeDue"
              : "deleteCoffeeChatAfterDue"
          }
        />
      ),
    })
  }

  if (startTime)
    return (
      <>
        <ProgressModalView />
        <div className="flex items-center">
          <CodingMeetingAreaImage />
          <div>
            <div className="mb-1">
              <span className="font-bold underline">
                {getKorExactTime(startTime)}
              </span>
              {"에 예약된 일정이 있습니다."}
            </div>
            <AreaText startTime={startTime} logined={true} />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <EnterCoffeeChatButton
            articleTitle={articleTitle}
            roomId={roomId}
            startTime={startTime}
            reservation_id={reservation_id}
            className="font-semibold text-sm bg-transparent bg-primary text-white"
          />
          <Button
            buttonTheme="third"
            className="hover:bg-white cursor-pointer"
            onClick={() => handleCancleReservation()}
          >
            취소하기
          </Button>
        </div>
      </>
    )
}

type AreaTextProps = {
  logined: boolean
  startTime?: string | null
}

function AreaText({ logined, startTime }: AreaTextProps) {
  const textContent =
    logined && startTime
      ? `버튼이 활성화 되면 커피챗에 입장할 수 있습니다.`
      : "커피챗에 입장하고 싶으시다구요?"

  return (
    <div className="whitespace-pre-line text-[#7E8280] font-normal sm:whitespace-normal sm:text-primary sm:font-semibold">
      {textContent}
    </div>
  )
}
