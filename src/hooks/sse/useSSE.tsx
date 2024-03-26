"use client"

import { useEffect, useState } from "react"
import { EventSourcePolyfill, MessageEvent, Event } from "event-source-polyfill"
import { getAuthCookie } from "@/util/actions/cookie"

interface UseSSEOptions {
  onMessage?: (event: MessageEvent) => void
  onSSEevent: (event: Event) => void
}

export function useSSE({ onMessage, onSSEevent }: UseSSEOptions) {
  const [eventSource, setEventSource] = useState<EventSourcePolyfill | null>(
    null,
  )

  useEffect(() => {
    const onEvent = (event: Event) => {
      onSSEevent(event)
    }

    const onError = (err: Event) => {
      console.log({ err })

      eventSource?.close()
    }

    ;(async () => {
      if (eventSource) return

      const targetEventSource = await connectSSE()

      if (targetEventSource) {
        if (onMessage) {
          targetEventSource.addEventListener("message", onMessage)
        }
        targetEventSource.addEventListener("QUESTION_REPLY", onEvent)
        targetEventSource.addEventListener("RANK_ANSWER", onEvent)
        targetEventSource.addEventListener("COFFEE_CHAT_REQUEST", onEvent)

        targetEventSource.addEventListener("error", onError)
      }

      setEventSource(targetEventSource)
    })()

    return () => {
      if (eventSource) {
        if (onMessage) {
          eventSource.removeEventListener("message", onMessage)
        }
        eventSource.removeEventListener("QUESTION_REPLY", onEvent)
        eventSource.removeEventListener("RANK_ANSWER", onEvent)
        eventSource.removeEventListener("COFFEE_CHAT_REQUEST", onEvent)

        eventSource.removeEventListener("error", onError)
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
