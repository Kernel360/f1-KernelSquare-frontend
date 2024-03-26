import { AlertType, SSEMessage } from "@/interfaces/sse"
import axios, { AxiosResponse } from "axios"

interface MockSSENotificationRequest<T extends AlertType> {
  targetUserId: number
  message: SSEMessage<T>
}

const mockSSEInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SSE,
  withCredentials: true,
})

export async function mockSSENotification<T extends AlertType>(
  request: MockSSENotificationRequest<T>,
) {
  mockSSEInstance.post<
    any,
    AxiosResponse<any, any>,
    MockSSENotificationRequest<T>
  >("/api/v1/alerts/sse", {
    ...request,
  })
}
