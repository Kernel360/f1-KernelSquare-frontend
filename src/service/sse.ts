import { AlertType, SSEMessage } from "@/interfaces/sse"
import axios, { AxiosResponse } from "axios"
import { alertApiInstance, apiInstance } from "./axios"
import { GetAlertListResponse } from "@/interfaces/dto/sse/get-alret-list"
import { RouteMap } from "./route-map"

interface MockSSENotificationRequest<T extends AlertType> {
  targetUserId: number
  message: SSEMessage<T>
}

// mock
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

// app
export async function getAlertList() {
  const res = await alertApiInstance.get<GetAlertListResponse>(
    RouteMap.alert.getAlertList,
  )

  return res
}
