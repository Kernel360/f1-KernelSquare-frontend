import { FIREBASE_COLLECTIONS, store } from "@/firebase/firebase-app"
import { DeleteFcmTokenResponse } from "@/interfaces/dto/fcm/delete-fcm-token.dto"
import { FireStoreTokenCollection } from "@/interfaces/fcm"
import { HttpStatusCode } from "axios"
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore"
import { NextRequest, NextResponse } from "next/server"

interface FcmTokenParams {
  params: {
    token: string
  }
}

export async function DELETE(request: NextRequest, { params }: FcmTokenParams) {
  const auth = request.headers.get("Authorization")
  if (!auth || auth !== process.env.NEXT_PUBLIC_FIREBASE_ACCESS_KEY) {
    return NextResponse.json<DeleteFcmTokenResponse>(
      {
        code: HttpStatusCode.Unauthorized,
        msg: "인증되지 않았습니다",
      },
      { status: HttpStatusCode.Unauthorized },
    )
  }

  const token = params.token

  const q = query(
    collection(store, FIREBASE_COLLECTIONS.TOKEN),
    where("tokenList", "array-contains", token),
  )
  const snapshot = await getDocs(q)

  if (!snapshot.empty) {
    const target = snapshot.docs[0]

    const tokenList = target.get(
      "tokenList",
    ) as FireStoreTokenCollection["tokenList"]
    const tokenListPayload = tokenList.filter((_token) => _token !== token)

    if (!tokenListPayload.length) {
      await deleteDoc(target.ref)

      return NextResponse.json<DeleteFcmTokenResponse>(
        {
          code: HttpStatusCode.Ok,
          msg: "FCM 토큰 삭제",
        },
        { status: HttpStatusCode.Ok },
      )
    }

    await updateDoc(target.ref, {
      tokenList: tokenListPayload,
    })
  }

  return NextResponse.json<DeleteFcmTokenResponse>(
    {
      code: HttpStatusCode.Ok,
      msg: "FCM 토큰 삭제",
    },
    { status: HttpStatusCode.Ok },
  )
}
