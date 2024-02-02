"use client"

import DeleteMemberModal from "@/app/profile/[id]/_components/deleteMember/DeleteMemberModal"
import useModal from "@/hooks/useModal"

function Test() {
  const { openModal } = useModal()

  const openWithdrawForm = () => {
    openModal({
      containsHeader: false,
      closeableDim: true,
      content: <DeleteMemberModal />,
    })
  }

  return <button onClick={openWithdrawForm}>탈퇴</button>
}

export default Test
