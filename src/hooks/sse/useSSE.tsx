"use client"

import { useEffect } from "react"
import { EventSourcePolyfill, MessageEvent, Event } from "event-source-polyfill"
import { getAuthCookie } from "@/util/actions/cookie"
import { useClientSession } from "../useClientSession"

interface UseSSEOptions {
  onMessage?: (event: MessageEvent) => void
  onSSEevent: (event: Event) => void
}

let eventSource: EventSourcePolyfill | null = null

export function useSSE({ onMessage, onSSEevent }: UseSSEOptions) {
  const { user } = useClientSession()

  useEffect(() => {
    const onEvent = (event: Event) => {
      onSSEevent(event)
    }

    const onError = (err: Event) => {
      console.log("[error]", { eventSource, err })

      // eventSource?.close()
    }

    ;(async () => {
      if (eventSource) {
        const { accessToken } = await getAuthCookie()

        if (!accessToken) {
          if (eventSource && eventSource.readyState !== eventSource.CLOSED) {
            console.log("close", { eventSource })

            eventSource.close()
            eventSource = null

            return
          }

          return
        }

        if (eventSource && eventSource.readyState === eventSource.CLOSED) {
          console.log("readyStateClosed", { eventSource })
          eventSource = null
        }

        return
      }

      if (!eventSource && user) {
        const targetEventSource = await connectSSE()

        if (targetEventSource) {
          if (onMessage) {
            targetEventSource.addEventListener("message", onMessage)
          }
          targetEventSource.addEventListener("QUESTION_REPLY", onEvent)
          targetEventSource.addEventListener("RANK_ANSWER", onEvent)
          targetEventSource.addEventListener("COFFEE_CHAT_REQUEST", onEvent)

          targetEventSource.addEventListener("error", onError)

          eventSource = targetEventSource
        }
      }
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

        eventSource.close()

        eventSource = null
      }
    }
  }, [user]) /* eslint-disable-line */

  return eventSource
}

async function connectSSE() {
  const { accessToken } = await getAuthCookie()

  if (!accessToken) return null

  if (eventSource && eventSource.readyState !== eventSource.CLOSED) {
    return eventSource
  }

  const targetEventSource = new EventSourcePolyfill(
    `${process.env.NEXT_PUBLIC_SSE}/api/v1/alerts/sse`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    },
  )

  return targetEventSource
}
