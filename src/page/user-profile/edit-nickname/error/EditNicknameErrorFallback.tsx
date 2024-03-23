"use client"

import useModal from "@/hooks/useModal"
import { EditNicknameRoleError } from "./nicknameErrors"
import { Button } from "@/components/ui/button"
import Spacing from "@/components/shared/Spacing"
import Link from "next/link"
import LoginForm from "@/components/form/LoginForm"
import { useClientSession } from "@/hooks/useClientSession"
import { useEffect } from "react"

interface FallbackProps {
  roleError: boolean
  error: string
}

function EditNicknameErrorFallback({ roleError, error }: FallbackProps) {
  const { clientSessionReset } = useClientSession()

  const type = getErrorType({ roleError, error })

  const Fallback = () => {
    switch (type) {
      case "Unauthorized":
        return <Unauthorized />
      case "InternelError":
      default:
        return <InternelError />
    }
  }

  useEffect(() => {
    if (type === "Unauthorized") {
      clientSessionReset()
    }
  }, []) /* eslint-disable-line */

  return (
    <div className="w-full mx-auto max-w-[320px] border border-colorsGray rounded-lg bg-white break-all p-4">
      <Fallback />
    </div>
  )
}

export default EditNicknameErrorFallback

function getErrorType({
  roleError,
  error,
}: {
  roleError: boolean
  error: string
}) {
  const parsedError = JSON.parse(error)

  if (roleError) {
    return (parsedError as EditNicknameRoleError).cause.type
  }

  return "InternelError"
}

function Unauthorized() {
  const { openModal } = useModal()

  const login = () => {
    openModal({
      containsHeader: true,
      closeableDim: true,
      content: <LoginForm />,
    })
  }

  return (
    <section className="flex flex-col w-full items-center">
      <h4>로그인 후 닉네임 수정이 가능합니다</h4>
      <Spacing size={16} />
      <Button onClick={login}>로그인</Button>
    </section>
  )
}

function InternelError() {
  return (
    <section className="flex flex-col w-full items-center">
      <h4>에러가 발생했습니다</h4>
      <Spacing size={16} />
      <Link href={`/qna?page=0`}>
        <Button>개발자 Q&A로 이동</Button>
      </Link>
    </section>
  )
}
