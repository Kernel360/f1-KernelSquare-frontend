"use client"

import Spacing from "@/components/shared/Spacing"
import Button from "@/components/shared/button/Button"
import { useClientSession } from "@/hooks/useClientSession"
import useModal from "@/hooks/useModal"
import { useRouter } from "next/navigation"

function EditNicknameCancel() {
  const { openModal } = useModal()

  const confirm = () => {
    openModal({
      containsHeader: false,
      content: <ConfirmCancel />,
    })
  }

  return (
    <Button
      className="text-colorsDarkGray underline underline-offset-4 font-medium"
      onClick={confirm}
    >
      수정을 취소할게요
    </Button>
  )
}

export default EditNicknameCancel

function ConfirmCancel() {
  const { user } = useClientSession()

  const { push } = useRouter()
  const { closeModal } = useModal()

  return (
    <div>
      닉네임 수정을 취소하시겠습니까?
      <Spacing size={16} />
      <div className="flex justify-center items-center gap-3">
        <Button
          buttonTheme="primary"
          onClick={() => {
            closeModal()

            push(`/profile/${user?.member_id}`)
          }}
        >
          네
        </Button>
        <Button buttonTheme="secondary" onClick={() => closeModal()}>
          아니요
        </Button>
      </div>
    </div>
  )
}
