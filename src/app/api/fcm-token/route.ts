import { FIREBASE_COLLECTIONS, store } from "@/firebase/firebase-app"
import {
  RegisterFcmTokenRequest,
  RegisterFcmTokenResponse,
} from "@/interfaces/dto/fcm/register-fcm-token.dto"
import { FireStoreTokenCollection } from "@/interfaces/fcm"
import { HttpStatusCode } from "axios"
import { collection, doc, setDoc, updateDoc, getDoc } from "firebase/firestore"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const auth = request.headers.get("Authorization")
  if (!auth || auth !== process.env.NEXT_PUBLIC_FIREBASE_ACCESS_KEY) {
    return NextResponse.json<RegisterFcmTokenResponse>(
      {
        code: HttpStatusCode.Unauthorized,
        msg: "인증되지 않았습니다",
      },
      { status: HttpStatusCode.Unauthorized },
    )
  }

  const { user, token } = (await request.json()) as RegisterFcmTokenRequest

  const docRef = doc(
    collection(store, FIREBASE_COLLECTIONS.TOKEN),
    `${user.id}`,
  )

  const tokenDoc = await getDoc(docRef)
  const tokenData = tokenDoc.data()

  if (!tokenData) {
    const newToken: FireStoreTokenCollection = {
      user: {
        id: user.id,
      },
      tokenList: [token],
    }

    await setDoc(docRef, newToken)

    return NextResponse.json<RegisterFcmTokenResponse>(
      {
        code: 201,
        msg: "FCM 토큰 등록 성공",
      },
      {
        status: 201,
      },
    )
  }

  const tokenList = tokenDoc.get(
    "tokenList",
  ) as FireStoreTokenCollection["tokenList"]

  if (!tokenList.find((_token) => _token === token)) {
    await updateDoc(docRef, {
      tokenList: [...tokenList, token],
    })
  }

  return NextResponse.json<RegisterFcmTokenResponse>(
    {
      code: 200,
      msg: "FCM 토큰 등록 성공",
    },
    {
      status: 200,
    },
  )
}
