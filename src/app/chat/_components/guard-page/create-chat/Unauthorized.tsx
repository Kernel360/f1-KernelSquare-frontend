"use client"

import Mentee from "@/components/shared/animation/Mentee"
import notificationMessage from "@/constants/message/notification"
import { useClientSession } from "@/hooks/useClientSession"
import { useEffect } from "react"

function CreateChatPageUnauthorized() {
  const { clientSessionReset } = useClientSession()

  useEffect(() => {
    clientSessionReset()
  }, []) /* eslint-disable-line */

  return (
    <div className="text-center">
      <div className="w-[400px] min-h-[266px] m-auto mt-[100px]">
        <Mentee />
      </div>
      <div className="text-xl">{notificationMessage.unauthorized}.</div>
    </div>
  )
}

export default CreateChatPageUnauthorized
