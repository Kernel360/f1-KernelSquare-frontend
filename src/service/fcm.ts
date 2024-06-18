import {
  RegisterFcmTokenRequest,
  RegisterFcmTokenResponse,
} from "@/interfaces/dto/fcm/register-fcm-token.dto"
import {
  NotificationType,
  SendFcmRequest,
  SendFcmResponse,
} from "@/interfaces/dto/fcm/send-fcm.dto"
import { AxiosResponse } from "axios"
import { firebaseApiInstance } from "./axios"
import {
  DeleteFcmTokenRequest,
  DeleteFcmTokenResponse,
} from "@/interfaces/dto/fcm/delete-fcm-token.dto"
import {
  GetUserFcmTokenRequest,
  GetUserFcmTokenResponse,
} from "@/interfaces/dto/fcm/get-user-fcm-token.dto"

export async function getUserFcmToken({ userId }: GetUserFcmTokenRequest) {
  const res = await firebaseApiInstance.get<GetUserFcmTokenResponse>(
    `/api/fcm-token/user/${userId}`,
  )

  return res
}

export async function registerFcmToken({
  user,
  token,
}: RegisterFcmTokenRequest) {
  const res = await firebaseApiInstance.post<
    any,
    AxiosResponse<RegisterFcmTokenResponse>,
    RegisterFcmTokenRequest
  >("/api/fcm-token", {
    user,
    token,
  })

  return res
}

export async function deleteFcmToken({ token }: DeleteFcmTokenRequest) {
  const res = await firebaseApiInstance.delete<DeleteFcmTokenResponse>(
    `/api/fcm-token/${token}`,
  )

  return res
}

export async function sendFcm<TData extends NotificationType>(
  type: TData,
  payload: SendFcmRequest<TData>,
) {
  const res = await firebaseApiInstance.post<
    any,
    AxiosResponse<SendFcmResponse>,
    SendFcmRequest<TData> & { type: TData }
  >("/api/send-fcm", {
    type,
    ...payload,
  })

  return res
}
