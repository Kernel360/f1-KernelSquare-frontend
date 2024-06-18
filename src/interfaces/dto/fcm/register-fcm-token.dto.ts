import { FireStoreTokenCollection } from "@/interfaces/fcm"
import { APIResponse } from "../api-response"

export interface RegisterFcmTokenRequest {
  user: FireStoreTokenCollection["user"]
  token: string
}

export interface RegisterFcmTokenResponse extends APIResponse {}
