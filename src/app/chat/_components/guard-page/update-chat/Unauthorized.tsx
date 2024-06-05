"use client"

import Mentee from "@/components/shared/animation/Mentee"
import { useClientSession } from "@/hooks/useClientSession"
import { useEffect } from "react"

function UpdateCoffeeChatPageUnauthorized() {
  const { clientSessionReset } = useClientSession()

  useEffect(() => {
    clientSessionReset()
  }, []) /* eslint-disable-line */

  return (
    <div className="text-center">
      <div className="w-[400px] min-h-[266px] m-auto mt-[100px]">
        <Mentee />
      </div>
      <div className="text-xl">로그인이 필요합니다.</div>
    </div>
  )
}

export default UpdateCoffeeChatPageUnauthorized
