import Profile from "@/components/shared/Profile"
import Spacing from "@/components/shared/Spacing"
import HashTag from "@/components/shared/tag/HashTag"
import Image from "next/image"
import type { CoffeeChatReservationDetailPayload } from "@/interfaces/dto/coffee-chat/coffeechat-reservation-detail.dto"
import Button from "@/components/shared/button/Button"
import { deleteCoffeeChatPost } from "@/service/coffee-chat"
import useModal from "@/hooks/useModal"
import SuccessModalContent from "@/page/qna-detail/components/SuccessModalContent"
import { notificationMessage, successMessage } from "@/constants/message"
import { useQueryClient } from "@tanstack/react-query"
import queryKey from "@/constants/queryKey"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import ConfirmModal from "@/components/shared/confirm-modal/ConfirmModal"
import { useClientSession } from "@/hooks/useClientSession"

interface CoffeeChatDetailHeaderProps
  extends Pick<
    CoffeeChatReservationDetailPayload,
    | "title"
    | "nickname"
    | "member_image_url"
    | "level"
    | "level_image_url"
    | "hashtags"
    | "article_id"
  > {}

function CoffeeChatDetailHeader({
  title,
  nickname,
  member_image_url,
  level,
  level_image_url,
  hashtags,
  article_id,
}: CoffeeChatDetailHeaderProps) {
  const { openModal } = useModal()
  const queryClient = useQueryClient()
  const router = useRouter()
  const { user } = useClientSession()
  const isMyPage = user?.nickname === nickname

  const handleDeleteQuestion = async () => {
    const onSuccess = async () => {
      try {
        const res = await deleteCoffeeChatPost({
          postId: article_id,
        })
        console.log("success", res.data.msg)
        openModal({
          content: (
            <SuccessModalContent
              message={successMessage.deleteCoffeeChatPost}
            />
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
        router.replace("/chat")
      } catch (err) {
        console.error(err)
      }
    }
    const onCancel = () => {
      toast.error(notificationMessage.cancleDeleteCoffeeChatPost, {
        position: "top-center",
      })
    }
    openModal({
      containsHeader: false,
      content: (
        <ConfirmModal.ModalContent
          onSuccess={onSuccess}
          onCancel={onCancel}
          situation="deleteContent"
        />
      ),
    })
  }

  return (
    <section>
      <div className="flex gap-1 items-center">
        <div className="flex-1">
          <div className="font-bold mb-5 max-w-full text-[24px] mt-5 text-[#444444]">
            {title}
          </div>
          <Spacing size={12} />
          <ul className="w-full flex flex-wrap gap-2">
            {hashtags.map((tag) => (
              <li key={`hash-${tag.hashtag_id}`}>
                <HashTag>{tag.content}</HashTag>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-1 items-center">
          <Profile className="w-10 h-10" profileImage={member_image_url} />
          <div>
            <span className="text-sm font-bold">{nickname}</span>
            <div className="flex items-center">
              <div className="relative w-4 h-4 flex justify-center items-center">
                <Image
                  src={level_image_url}
                  alt={`level badge`}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <span className="text-xs">Lv.{level}</span>
            </div>
          </div>
        </div>
      </div>
      {isMyPage && (
        <div className="flex float-right mb-5">
          <Button
            buttonTheme="primary"
            className="px-2"
            onClick={() => handleDeleteQuestion()}
          >
            삭제하기
          </Button>
        </div>
      )}
    </section>
  )
}

export default CoffeeChatDetailHeader
