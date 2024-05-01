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
import { errorMessage } from "@/constants/message/error"
import { useQueryClient } from "@tanstack/react-query"
import queryKey from "@/constants/queryKey"
import { revalidatePage } from "@/util/actions/revalidatePage"
import { AxiosError } from "axios"
import { APIResponse } from "@/interfaces/dto/api-response"
import ConfirmModal from "@/components/shared/confirm-modal/ConfirmModal"
import { useProgressModal } from "@/hooks/useProgressModal"
import dayjs from "dayjs"
import successMessage from "@/constants/message/success"

type EnterChatRoomArea = EnterCoffeeChatProps & {}

function EnterChatRoomArea({
  articleTitle,
  roomId,
  startTime,
  reservation_id,
}: EnterChatRoomArea) {
  const wrapperClassNames = twMerge([
    `flex flex-col sm:flex-row w-full justify-between items-center bg-[#EAF7F0] rounded-md overflow-hidden border border-transparent sm:border-[#E0E0E0]`,
    `p-4`,
    `sm:p-0 sm:pr-2 sm:bg-white`,
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
        <CodingMeetingAreaImage className="sm:block" />
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
          <CodingMeetingAreaImage className="sm:block" />
          <div>
            <div className="mb-1 [@media_(min-width:340px)]:whitespace-pre-line">
              <span className="font-bold underline">
                {`${getKorExactTime(startTime)}`}
              </span>
              <span>{`에\n예약된 일정이 있습니다.`}</span>
            </div>
            <AreaText
              startTime={startTime}
              logined={true}
              className={"text-xs"}
            />
          </div>
        </div>
        <div className="w-full sm:w-fit flex flex-row justify-center items-center mt-2 sm:mt-0 sm:flex-col sm:ml-2 flex-shrink-0 gap-2">
          <EnterCoffeeChatButton
            articleTitle={articleTitle}
            roomId={roomId}
            startTime={startTime}
            reservation_id={reservation_id}
            className="font-semibold text-sm bg-transparent bg-primary text-white h-full sm:self-stretch"
          />
          <Button
            buttonTheme="third"
            className="hover:bg-secondary hover:border-secondary hover:text-white cursor-pointer px-4 py-[7.2px] h-full sm:self-stretch"
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
  className?: string
}

function AreaText({ logined, startTime, className }: AreaTextProps) {
  const classNames = twMerge([
    "whitespace-pre-line text-[#7E8280] font-normal sm:whitespace-normal sm:text-primary sm:font-semibold",
    className,
  ])

  const textContent =
    logined && startTime
      ? `버튼이 활성화 되면 커피챗에 입장할 수 있습니다.`
      : "커피챗에\n입장하고 싶으시다구요?"

  return <div className={classNames}>{textContent}</div>
}
