"use client"

import LoginForm from "@/components/form/LoginForm"
import Spacing from "@/components/shared/Spacing"
import UserProfileNotFound from "@/components/shared/animation/UserProfileNotFound"
import Button from "@/components/shared/button/Button"
import useModal from "@/hooks/useModal"
import checkFailWithEmoji from "@/assets/lottie/check-fail-with-emoji.json"
import Lottie from "lottie-react"
import Link from "next/link"
import { AxiosError, HttpStatusCode } from "axios"

interface NotificationErrorProps {
  error: Error | AxiosError
}

function NotificationError({ error }: NotificationErrorProps) {
  const { openModal } = useModal()

  const login = () => {
    openModal({
      content: <LoginForm />,
    })
  }

  if (
    error instanceof AxiosError &&
    error.response?.status === HttpStatusCode.Unauthorized
  ) {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <UserProfileNotFound className="w-[150px]" />
        <div>로그인 후 알림 목록 확인이 가능합니다.</div>
        <Spacing size={16} />
        <Button buttonTheme="primary" onClick={login}>
          로그인
        </Button>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Lottie className="w-28" animationData={checkFailWithEmoji} />
      <div>에러가 발생했습니다.</div>
      <Spacing size={16} />
      <Link href="/qna?page=0">
        <Button buttonTheme="primary">개발자 Q&A로 이동</Button>
      </Link>
    </div>
  )
}

export default NotificationError
