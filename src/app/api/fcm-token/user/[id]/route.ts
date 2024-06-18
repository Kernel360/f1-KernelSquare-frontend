import { FIREBASE_COLLECTIONS, store } from "@/firebase/firebase-app"
import { GetUserFcmTokenResponse } from "@/interfaces/dto/fcm/get-user-fcm-token.dto"
import { FireStoreTokenCollection } from "@/interfaces/fcm"
import { HttpStatusCode } from "axios"
import { collection, doc, getDoc } from "firebase/firestore"
import { NextRequest, NextResponse } from "next/server"

interface UserFcmTokenParams {
  params: {
    id: string
  }
}

export async function GET(
  request: NextRequest,
  { params }: UserFcmTokenParams,
) {
  const auth = request.headers.get("Authorization")
  if (!auth || auth !== process.env.NEXT_PUBLIC_FIREBASE_ACCESS_KEY) {
    return NextResponse.json<GetUserFcmTokenResponse>(
      {
        code: HttpStatusCode.Unauthorized,
        msg: "인증되지 않았습니다",
      },
      { status: HttpStatusCode.Unauthorized },
    )
  }

  const userId = params.id

  const docRef = doc(collection(store, FIREBASE_COLLECTIONS.TOKEN), userId)

  const tokenDoc = await getDoc(docRef)
  const tokenData = tokenDoc.data()

  if (!tokenData) {
    return NextResponse.json<GetUserFcmTokenResponse>(
      {
        code: HttpStatusCode.NotFound,
        msg: "토큰 없음",
        data: {
          tokenList: null,
        },
      },
      {
        status: HttpStatusCode.Ok,
      },
    )
  }

  return NextResponse.json<GetUserFcmTokenResponse>({
    code: HttpStatusCode.Ok,
    msg: "토큰 조회 성공",
    data: {
      tokenList: tokenData.tokenList as FireStoreTokenCollection["tokenList"],
    },
  })
}
