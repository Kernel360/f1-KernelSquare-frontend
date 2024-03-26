import {
  RECEIVED_MESSAGE_STATE,
  SSE_STATE_KEY,
} from "@/constants/sse/sse-constants"
import { atom } from "recoil"

interface SSEAtom {
  receivedMessage: boolean
}

export const sseAtom = atom<SSEAtom>({
  key: "sse-atom",
  default: {
    receivedMessage: false,
  },
  effects: [
    ({ setSelf, trigger, onSet }) => {
      if (trigger === "get") {
        if (typeof window !== "undefined") {
          const sseStateStorage = localStorage.getItem(SSE_STATE_KEY)

          const receivedMessage = getReceivedFromStorage(sseStateStorage)

          setSelf({ receivedMessage })
        }

        if (typeof window === "undefined") {
          const { cookies } = require("next/headers")

          const sseStateCookie = cookies().get(SSE_STATE_KEY)?.value

          const receivedMessage = getReceivedFromStorage(sseStateCookie)

          setSelf({ receivedMessage })
        }
      }
    },
  ],
})

function getReceivedFromStorage(value?: string | null) {
  return value === null || value === undefined
    ? false
    : value === RECEIVED_MESSAGE_STATE.Received
    ? true
    : value === RECEIVED_MESSAGE_STATE.NotReceived
    ? false
    : false
}
