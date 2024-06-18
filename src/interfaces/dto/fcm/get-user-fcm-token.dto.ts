import { FireStoreTokenCollection } from "@/interfaces/fcm"
import { APIResponse } from "../api-response"

export interface GetUserFcmTokenRequest {
  userId: number
}

export interface GetUserFcmTokenPayload {
  tokenList: FireStoreTokenCollection["tokenList"] | null
}

export interface GetUserFcmTokenResponse
  extends APIResponse<GetUserFcmTokenPayload> {}
