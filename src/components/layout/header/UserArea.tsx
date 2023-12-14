"use client"

import LoginForm from "@/components/form/LoginForm"
import Button from "@/components/shared/button/Button"
import useModal from "@/hooks/useModal"
import Link from "next/link"
import { Icons } from "@/components/icons/Icons"

function UserArea() {
  // [TODO] 훅을 통해 유저정보 가져오기
  const user = false

  if (!user) {
    return <NotLoginedUserArea />
  }

  return (
    <div className="flex gap-2 items-center">
      <Link href="/">
        <Icons.UserProfile className="text-2xl fill-colorsGray" />
      </Link>
      <Button className="p-0">
        <Icons.Notification className="text-2xl text-colorsGray" />
      </Button>
    </div>
  )
}

function NotLoginedUserArea() {
  const { openModal } = useModal()

  return (
    <div className="flex gap-2 items-center">
      <Button
        className="border border-colorsGray font-normal"
        buttonTheme="primary"
        onClick={() => openModal({ content: <LoginForm /> })}
      >
        로그인
      </Button>
      <Link href={"/signup"}>
        <Button
          ghost
          buttonTheme="secondary"
          className="border border-colorsGray font-normal"
        >
          회원가입
        </Button>
      </Link>
    </div>
  )
}

export default UserArea
