import { APIResponse } from "../api-response"

export interface DeleteFcmTokenRequest {
  token: string
}

export interface DeleteFcmTokenResponse extends APIResponse {}
