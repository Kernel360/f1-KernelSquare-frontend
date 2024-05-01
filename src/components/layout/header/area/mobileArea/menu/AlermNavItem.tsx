"use client"

import AlermButtonUI from "@/components/alerm-button/AlermButtonUI"
import {
  RequiredAuthIndex,
  requiredAuthRoute,
} from "@/constants/navigationRoute"
import {
  RECEIVED_MESSAGE_STATE,
  SSE_STATE_KEY,
} from "@/constants/sse/sse-constants"
import { useSSE } from "@/hooks/sse/useSSE"
import { useClientSession } from "@/hooks/useClientSession"
import { sseAtom } from "@/recoil/atoms/sse/sseAtom"
import { setCookie } from "@/util/actions/cookie"
import { useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import { useRecoilState } from "recoil"

interface AlermNavItemProps {
  active: boolean
  onClick: () => void
}

function AlermNavItem({ active, onClick }: AlermNavItemProps) {
  const { user } = useClientSession()
  const queryClient = useQueryClient()

  const [sse, setSSE] = useRecoilState(sseAtom)

  const eventSource = useSSE({
    onSSEevent(event) {
      localStorage.setItem(SSE_STATE_KEY, RECEIVED_MESSAGE_STATE.Received)
      setCookie(SSE_STATE_KEY, RECEIVED_MESSAGE_STATE.Received)

      setSSE((prev) => ({
        ...prev,
        receivedMessage: true,
      }))

      queryClient.invalidateQueries({
        queryKey: ["alert", "list", user?.member_id],
      })
    },
  })

  const alermNav = requiredAuthRoute[RequiredAuthIndex.Notification]

  return (
    <Link
      href={alermNav.to}
      className="inline-flex align-top items-center py-4 gap-4"
      onClick={() => {
        localStorage.setItem(SSE_STATE_KEY, RECEIVED_MESSAGE_STATE.NotReceived)
        setCookie(SSE_STATE_KEY, RECEIVED_MESSAGE_STATE.NotReceived)

        setSSE((prev) => ({
          ...prev,
          receivedMessage: false,
        }))

        onClick && onClick()
      }}
    >
      <AlermButtonUI
        newAlerm={sse.receivedMessage}
        iconClassNames={
          sse.receivedMessage || active ? "text-[#333]" : "text-[#828282]"
        }
        className="p-0"
      />
      <span
        className={`${active ? "font-bold text-[#333]" : "text-[#828282]"}`}
      >
        {alermNav.label}
      </span>
    </Link>
  )
}

export default AlermNavItem
