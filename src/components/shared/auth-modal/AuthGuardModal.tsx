"use client"

import { useCallback, useLayoutEffect } from "react"
import AskQustionGuardModal from "./AskQustionGuardModal"
import SignupGuardModal from "./SignupGuardModal"
import UserProfileGuardModal from "./UserProfileGuardModal"
import MyPageGuardModal from "./MyPageGuardModal"
import UpdateQuestionGuardModal from "./UpdateQustionGuardModal"
import { useClientSession } from "@/hooks/useClientSession"

type AuthGuardModalPages =
  | "question"
  | "updateQuestion:Unauthorized"
  | "updateQuestion:Forbidden"
  | "signup"
  | "userProfile"
  | "profile"

type AuthGuardPayloadKey = Extract<
  AuthGuardModalPages,
  "updateQuestion:Unauthorized" | "updateQuestion:Forbidden"
>

type AuthGuardPayload<P extends AuthGuardPayloadKey> =
  P extends "updateQuestion:Unauthorized"
    ? { questionId: number }
    : P extends "updateQuestion:Forbidden"
    ? { questionId: number }
    : {}

type AuthGuardModalProps<T extends AuthGuardModalPages> = {
  page: T
} & (T extends AuthGuardPayloadKey
  ? { payload: AuthGuardPayload<T> }
  : { payload?: never })

// [회원가입, 인가되지 않은 유저의 질문 수정] 세션 유지 되야 됨
const sholudNotResetSessionPaths: Array<AuthGuardModalPages> = [
  "signup",
  "updateQuestion:Forbidden",
]

function AuthGuardModal<T extends AuthGuardModalPages>({
  page,
  payload,
}: AuthGuardModalProps<T>) {
  const { clientSessionReset } = useClientSession()

  const RenderAuthModal = useCallback(() => {
    switch (page) {
      case "question":
        return <AskQustionGuardModal />
      case "updateQuestion:Unauthorized":
        return (
          <UpdateQuestionGuardModal
            guardType="Unauthorized"
            questionId={payload!.questionId}
          />
        )
      case "updateQuestion:Forbidden":
        return (
          <UpdateQuestionGuardModal
            guardType="Forbidden"
            questionId={payload!.questionId}
          />
        )
      case "signup":
        return <SignupGuardModal />
      case "userProfile":
        return <UserProfileGuardModal />
      case "profile":
        return <MyPageGuardModal />
      default:
        return null
    }
  }, []) /* eslint-disable-line */

  useLayoutEffect(() => {
    if (sholudNotResetSessionPaths.includes(page)) {
      return
    }

    clientSessionReset()
  }, []) /* eslint-disable-line */

  return <RenderAuthModal />
}

export default AuthGuardModal
