"use server"

import { GetUserFcmTokenRequest } from "@/interfaces/dto/fcm/get-user-fcm-token.dto"
import {
  NotificationType,
  SendFcmRequest,
} from "@/interfaces/dto/fcm/send-fcm.dto"
import { getUserFcmToken, registerFcmToken, sendFcm } from "@/service/fcm"

export async function hasFcmTokenAction({
  userId,
  token,
}: GetUserFcmTokenRequest & { token: string | null }) {
  try {
    const res = await getUserFcmToken({ userId })

    const tokenList = res.data.data?.tokenList

    return {
      success: true,
      hasFcmToken:
        token && tokenList?.length ? tokenList.includes(token) : false,
    }
  } catch (error) {
    return { success: false }
  }
}

export async function registerFcmTokenAction({
  userId,
  token,
}: {
  userId: number
  token: string
}) {
  try {
    await registerFcmToken({
      user: {
        id: userId,
      },
      token,
    })

    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

export async function sendFcmAction<TData extends NotificationType>(
  type: TData,
  payload: SendFcmRequest<TData>["notification"],
) {
  try {
    await sendFcm(type, {
      notification: { ...payload },
    })

    return { success: true }
  } catch (error) {
    return { success: false }
  }
}
