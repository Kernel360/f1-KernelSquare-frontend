"use client"

import LoginForm from "@/components/form/LoginForm"
import { getHistorySessionPath } from "@/util/historySession/path"
import { useSearchParams } from "next/navigation"

function LoginPage() {
  const params = useSearchParams()
  const continueURL = params.get("continueURL")

  const getPath = () => {
    const targetPath = getHistorySessionPath()?.currentPath

    return continueURL ?? targetPath ?? "/qna?page=0"
  }

  return (
    <div className="w-full min-h-[inherit] flex justify-center items-center">
      <LoginForm continueURL={getPath()} />
    </div>
  )
}

export default LoginPage
