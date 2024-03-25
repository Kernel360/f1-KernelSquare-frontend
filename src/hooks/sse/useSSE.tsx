"use client"

import { useEffect, useState } from "react"
import { EventSourcePolyfill, MessageEvent } from "event-source-polyfill"
import { getAuthCookie } from "@/util/actions/cookie"

interface UseSSEOptions {
  onMessage: (event: MessageEvent) => void
}

export function useSSE({ onMessage }: UseSSEOptions) {
  const [eventSource, setEventSource] = useState<EventSourcePolyfill | null>(
    null,
  )

  useEffect(() => {
    ;(async () => {
      if (eventSource) return

      const targetEventSource = await connectSSE()

      if (targetEventSource) {
        targetEventSource.addEventListener("message", onMessage)
      }

      setEventSource(targetEventSource)
    })()

    return () => {
      if (eventSource) {
        eventSource.removeEventListener("message", onMessage)
      }
    }
  }, [eventSource]) /* eslint-disable-line */

  return eventSource
}

async function connectSSE() {
  const { accessToken } = await getAuthCookie()

  if (!accessToken) return null

  const eventSource = new EventSourcePolyfill(
    `${process.env.NEXT_PUBLIC_SSE}/api/v1/alerts/sse`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
      heartbeatTimeout: 60 * 60 * 1000,
    },
  )

  return eventSource
}
