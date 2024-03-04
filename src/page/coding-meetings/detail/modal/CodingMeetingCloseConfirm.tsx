"use client"

import Spacing from "@/components/shared/Spacing"
import Button from "@/components/shared/button/Button"
import { useClientSession } from "@/hooks/useClientSession"
import useModal from "@/hooks/useModal"
import { APIResponse } from "@/interfaces/dto/api-response"
import { codingMeetingEditCommentAtom } from "@/recoil/atoms/coding-meeting/comment"
import { closeCodingMeeting } from "@/service/coding-meetings"
import { revalidatePage } from "@/util/actions/revalidatePage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError, HttpStatusCode } from "axios"
import { toast } from "react-toastify"
import { useResetRecoilState } from "recoil"

interface CodingMeetingCloseConfirmProps {
  meetingToken: string
}

function CodingMeetingCloseConfirm({
  meetingToken,
}: CodingMeetingCloseConfirmProps) {
  const { clientSessionReset } = useClientSession()
  const resetCodingMeetingEditComment = useResetRecoilState(
    codingMeetingEditCommentAtom,
  )

  const queryClient = useQueryClient()

  const { closeModal } = useModal()

  const { mutate: closeCodingMeetingMutate, status } = useMutation({
    mutationFn: () =>
      closeCodingMeeting({ coding_meeting_token: meetingToken }),
    onSuccess: () => {
      closeModal()

      toast.success("마감 상태로 전환되었습니다", { position: "top-center" })

      queryClient.invalidateQueries({
        queryKey: ["codingMeeting", "list"],
      })

      revalidatePage(`/coding-meetings/[token]`, "page")
    },
    async onError(error) {
      closeModal()

      if (error instanceof AxiosError) {
        const { response } = error as AxiosError<APIResponse>

        if (response?.status === HttpStatusCode.Unauthorized) {
          resetCodingMeetingEditComment()

          await clientSessionReset()
          revalidatePage("*")

          setTimeout(() => {
            toast.error("로그인 후 모집 마감이 가능합니다.", {
              position: "top-center",
              toastId: "closeServerErrorToast",
            })
          }, 0)

          return
        }

        toast.error(response?.data.msg ?? "모집 마감이 실패했습니다", {
          position: "top-center",
          toastId: "closeServerErrorToast",
        })

        return
      }

      toast.error("모집 마감이 실패했습니다", {
        position: "top-center",
        toastId: "closeErrorToast",
      })
    },
  })

  const handleCodingMeetingClose = () => {
    if (status === "pending") return

    closeCodingMeetingMutate()
  }

  const handleCancel = () => {
    closeModal()
  }

  return (
    <section className="w-full flex flex-col items-center">
      <h4>모각코 모임 모집을 마감하시겠습니까?</h4>
      <Spacing size={24} />
      <div className="flex w-full justify-center items-center gap-4">
        <Button
          disabled={status === "pending"}
          className="w-fit h-fit disabled:bg-colorsGray"
          buttonTheme="primary"
          onClick={handleCodingMeetingClose}
        >
          {status === "pending" ? "마감 요청중" : "마감"}
        </Button>
        <Button
          className="w-fit h-fit disabled:bg-colorsGray"
          buttonTheme="secondary"
          onClick={handleCancel}
        >
          취소
        </Button>
      </div>
    </section>
  )
}

export default CodingMeetingCloseConfirm
