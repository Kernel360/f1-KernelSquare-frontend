"use client"

import LoginForm from "@/components/form/LoginForm"
import Button from "@/components/shared/button/Button"
import useModal from "@/hooks/useModal"
import CodingMeetingAreaImage from "@/page/coding-meetings/main/info-area/AreaImage"
import React from "react"

function NotLogined() {
  const { openModal } = useModal()

  const openLoginModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    openModal({
      content: <LoginForm />,
    })
  }

  return (
    <div className="flex w-full gap-3 justify-between items-center">
      <div className="flex items-center">
        <CodingMeetingAreaImage className="sm:block" />
        <div className="whitespace-pre-line text-[#7E8280] font-normal sm:whitespace-normal sm:text-primary sm:font-semibold">
          {"커피챗에\n입장하고 싶으신가요?"}
        </div>
      </div>
      <Button
        className="px-6 py-4 w-max shrink-0 font-semibold text-sm underline bg-transparent sm:bg-primary sm:no-underline sm:text-white"
        onClick={openLoginModal}
      >
        로그인 하기
      </Button>
    </div>
  )
}

export default NotLogined
