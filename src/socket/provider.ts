import { CompatClient, Stomp } from "@stomp/stompjs"
import SockJS from "sockjs-client"
import * as ws from "ws"

interface InitSocket {
  (serverUrl: string): {
    success: boolean
    socket: WebSocket | null
    stomp: CompatClient | null
    error?: any
  }
}

export const initSocket: InitSocket = (serverUrl: string) => {
  try {
    const socket = new SockJS(`${serverUrl}/kernel-square`)

    const stomp = Stomp.over(socket)

    // socket.onopen = (e) => {
    //   console.log("[socket open]", { e })
    // }

    // socket.onmessage = (e) => {
    //   console.log("[message]", { e })
    // }

    return {
      success: true,
      socket,
      stomp,
    }
  } catch (error) {
    return {
      success: false,
      socket: null,
      stomp: null,
      error,
    }
  }
}
