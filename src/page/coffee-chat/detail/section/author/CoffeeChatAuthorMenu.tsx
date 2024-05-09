"use client"

import Button from "@/components/shared/button/Button"
import ConfirmModal from "@/components/shared/confirm-modal/ConfirmModal"
import { UserProfileInfo } from "@/components/shared/user/UserInfo"
import cancelMessage from "@/constants/message/cancel"
import { errorMessage } from "@/constants/message/error"
import successMessage from "@/constants/message/success"
import queryKey from "@/constants/queryKey"
import { useClientSession } from "@/hooks/useClientSession"
import useModal from "@/hooks/useModal"
import { APIResponse } from "@/interfaces/dto/api-response"
import SuccessModalContent from "@/page/qna-detail/components/SuccessModalContent"
import { deleteCoffeeChatPost } from "@/service/coffee-chat"
import { useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

interface CoffeeChatAuthorMenuProps {
  author: UserProfileInfo
  articleId: number
}

function CoffeeChatAuthorMenu({
  author,
  articleId,
}: CoffeeChatAuthorMenuProps) {
  const { user } = useClientSession()

  if (!user) return null
  if (author.id !== user.member_id) return null

  return (
    <div>
      <CoffeeChatAuthorMenu.Delete articleId={articleId} />
    </div>
  )
}

export default CoffeeChatAuthorMenu

CoffeeChatAuthorMenu.Delete = function CoffeeChatAuthorMenuDelete({
  articleId,
}: {
  articleId: number
}) {
  const { replace } = useRouter()

  const queryClient = useQueryClient()
  const { openModal } = useModal()

  const onSuccess = async () => {
    try {
      const res = await deleteCoffeeChatPost({
        postId: articleId,
      })

      openModal({
        content: (
          <SuccessModalContent message={successMessage.deleteCoffeeChatPost} />
        ),
        onClose() {
          queryClient.invalidateQueries({
            queryKey: [queryKey.chat],
          })
        },
      })

      queryClient.invalidateQueries({
        queryKey: [queryKey.question],
      })

      replace("/chat")
    } catch (err) {
      if (err instanceof AxiosError) {
        const { response } = err as AxiosError<APIResponse>

        toast.error(response?.data.msg ?? errorMessage.deleteChatReservation, {
          toastId: "failToDeleteChatReservation",
          position: "top-center",
        })
        return
      }

      toast.error(errorMessage.deleteChatReservation, {
        toastId: "failToDeleteChatReservation",
        position: "top-center",
      })
    }
  }

  const onCancel = () => {
    toast.error(cancelMessage.deleteCoffeeChatPost, {
      position: "top-center",
    })
  }

  const openDeleteConfirmModal = () => {
    openModal({
      containsHeader: false,
      content: (
        <ConfirmModal.ModalContent
          situation="deleteContent"
          onSuccess={onSuccess}
          onCancel={onCancel}
        />
      ),
    })
  }

  return (
    <Button
      className="hover:text-danger font-bold cursor-pointer text-sm shrink-0 p-0.5"
      onClick={openDeleteConfirmModal}
    >
      삭제하기
    </Button>
  )
}
