"use client"

import { messaging } from "@/firebase/firebase-app"
import { GetUserFcmTokenRequest } from "@/interfaces/dto/fcm/get-user-fcm-token.dto"
import { RegisterFcmTokenRequest } from "@/interfaces/dto/fcm/register-fcm-token.dto"
import {
  NotificationType,
  SendFcmRequest,
} from "@/interfaces/dto/fcm/send-fcm.dto"
import {
  hasFcmTokenAction,
  registerFcmTokenAction,
  sendFcmAction,
} from "@/util/actions/fcm"
import { getToken } from "firebase/messaging"

export function useFCM() {
  const registerToken = async ({
    user,
  }: Pick<RegisterFcmTokenRequest, "user">) => {
    if (messaging) {
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_VAPID_KEY,
      }).catch((error) => {
        return null
      })

      if (!token) return

      await registerFcmTokenAction({
        userId: user.id,
        token,
      })
    }
  }

  const hasFcmToken = async ({ userId }: GetUserFcmTokenRequest) => {
    if (messaging) {
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_VAPID_KEY,
      }).catch((error) => {
        return null
      })

      const res = await hasFcmTokenAction({ userId, token })
      return res.success === false ? "error" : res.hasFcmToken!
    }

    return "error"
  }

  const send = async <TData extends NotificationType>(
    type: TData,
    payload: SendFcmRequest<TData>["notification"],
  ) => {
    if (messaging) {
      await sendFcmAction(type, payload)
    }
  }

  return { registerToken, hasFcmToken, send }
}
