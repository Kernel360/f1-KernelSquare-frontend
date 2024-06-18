import { FIREBASE_COLLECTIONS, store } from "@/firebase/firebase-app"
import {
  NotificationType,
  SendFcmRequest,
  SendFcmResponse,
} from "@/interfaces/dto/fcm/send-fcm.dto"
import { FireStoreTokenCollection } from "@/interfaces/fcm"
import { deleteFcmToken } from "@/service/fcm"
import { HttpStatusCode } from "axios"
import admin from "firebase-admin"
import {
  FirebaseMessagingError,
  MessagingClientErrorCode,
} from "firebase-admin/messaging"
import { collection, getDocs, query, where } from "firebase/firestore"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const auth = request.headers.get("Authorization")
  if (!auth || auth !== process.env.NEXT_PUBLIC_FIREBASE_ACCESS_KEY) {
    return NextResponse.json<SendFcmResponse>(
      {
        code: HttpStatusCode.Unauthorized,
        msg: "인증되지 않았습니다",
      },
      { status: HttpStatusCode.Unauthorized },
    )
  }

  const firebaseAdmin = admin.apps.length
    ? admin.app()
    : admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
      })

  const payload = await request.json()

  const type = payload.type as NotificationType
  const notification = payload.notification

  if (type === "answer" && isAppNotificationPayload("answer", notification)) {
    const { data, ...notificationPayload } = notification

    const { postId, questionAuthorId } = data

    const q = query(
      collection(store, FIREBASE_COLLECTIONS.TOKEN),
      where("user.id", "==", Number(questionAuthorId)),
    )
    const snapshot = await getDocs(q)

    if (!snapshot.empty) {
      const target = snapshot.docs[0]
      const tokenList = target.get(
        "tokenList",
      ) as FireStoreTokenCollection["tokenList"]

      const invalidTokenList: FireStoreTokenCollection["tokenList"] = []

      await Promise.allSettled(
        tokenList.map((token) =>
          firebaseAdmin
            .messaging()
            .send({
              token,
              notification: {
                ...notificationPayload,
              },
              data: {
                postId: `${postId}`,
              },
            })
            .catch((error) => {
              if (error instanceof FirebaseMessagingError) {
                if (
                  error.code ===
                    "messaging/registration-token-not-registered" ||
                  error.code === MessagingClientErrorCode.INVALID_ARGUMENT.code
                ) {
                  invalidTokenList.push(token)
                }
              }
            }),
        ),
      )

      if (invalidTokenList?.length) {
        await Promise.allSettled(
          invalidTokenList.map((invalidToken) =>
            deleteFcmToken({ token: invalidToken }),
          ),
        )
      }
    }
  }

  return NextResponse.json<SendFcmResponse>({
    code: HttpStatusCode.Ok,
    msg: "ok",
  })
}

function isAppNotificationPayload<TData extends NotificationType>(
  type: TData,
  payload: any,
): payload is SendFcmRequest<typeof type>["notification"] {
  return true
}
