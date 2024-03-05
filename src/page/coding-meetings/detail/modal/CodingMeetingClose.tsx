"use client"

import Button from "@/components/shared/button/Button"
import useModal from "@/hooks/useModal"
import { PiDoorOpenDuotone } from "react-icons/pi"
import CodingMeetingCloseConfirm from "./CodingMeetingCloseConfirm"
import { CodingMeetingAuthor } from "@/interfaces/coding-meetings"
import { useClientSession } from "@/hooks/useClientSession"

interface CodingMeetingCloseProps {
  meetingToken: string
  closed: boolean
  author: CodingMeetingAuthor
}

function CodingMeetingClose({
  meetingToken,
  closed,
  author,
}: CodingMeetingCloseProps) {
  const { user } = useClientSession()

  const { openModal } = useModal()

  const openCodingMeetingCloseConfirm = () =>
    openModal({
      closeableDim: false,
      containsHeader: false,
      content: <CodingMeetingCloseConfirm meetingToken={meetingToken} />,
    })

  if (user?.nickname !== author.member_nickname) return null
  if (closed) return null

  return (
    <Button
      className="hover:bg-[#f6f4f4] gap-1"
      onClick={openCodingMeetingCloseConfirm}
    >
      <PiDoorOpenDuotone className="text-xl" />
      마감하기
    </Button>
  )
}

export default CodingMeetingClose
