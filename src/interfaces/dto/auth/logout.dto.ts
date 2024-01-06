import { APIResponse } from "../api-response"

export interface LogoutRequest {
  access_token: string
  refresh_token: string
}

export interface LogoutResponse extends APIResponse {}
