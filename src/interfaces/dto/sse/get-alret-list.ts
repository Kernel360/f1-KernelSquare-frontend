import { SSEMessages } from "@/interfaces/sse"
import { APIResponse } from "../api-response"

export interface GetAlertListPayload {
  personal_alert_list: Array<SSEMessages>
}

export interface GetAlertListResponse
  extends APIResponse<GetAlertListPayload> {}
