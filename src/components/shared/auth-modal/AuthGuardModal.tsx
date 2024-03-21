"use client"

import { useCallback, useLayoutEffect } from "react"
import AskQustionGuardModal from "./AskQustionGuardModal"
import SignupGuardModal from "./SignupGuardModal"
import UserProfileGuardModal from "./UserProfileGuardModal"
import MyPageGuardModal from "./MyPageGuardModal"
import UpdateQuestionGuardModal from "./UpdateQustionGuardModal"
import { useClientSession } from "@/hooks/useClientSession"
import UpdateCodingMeetingGuardModal from "./UpdateCodingMeetingGuardModal"
import OAuthGuardModal from "./OAuthGuardModal"

type AuthGuardModalPages =
  | "question"
  | "updateQuestion:Unauthorized"
  | "updateQuestion:Forbidden"
  | "signup"
  | "userProfile"
  | "profile"
  | "updateCodingMeeting:Unauthorized"
  | "updateCodingMeeting:Forbidden"
  | "oauth"

type AuthGuardPayloadKey = Extract<
  AuthGuardModalPages,
  | "updateQuestion:Unauthorized"
  | "updateQuestion:Forbidden"
  | "updateCodingMeeting:Unauthorized"
  | "updateCodingMeeting:Forbidden"
>

type QuestionPayload = { questionId: number }
type CodingMeetingPayload = { coding_meeting_token: string }

type AuthGuardPayload<P extends AuthGuardPayloadKey> =
  P extends "updateQuestion:Unauthorized"
    ? QuestionPayload
    : P extends "updateQuestion:Forbidden"
    ? QuestionPayload
    : P extends "updateCodingMeeting:Unauthorized"
    ? CodingMeetingPayload
    : P extends "updateCodingMeeting:Forbidden"
    ? CodingMeetingPayload
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
  "updateCodingMeeting:Forbidden",
  "oauth",
]

const isUpdateQuestionPayload = (
  payload: any,
): payload is { questionId: number } =>
  (payload as { questionId?: number }).questionId !== undefined

const isUpdateCodingMeetingPayload = (
  payload: any,
): payload is { coding_meeting_token: string } =>
  (payload as { coding_meeting_token?: string }).coding_meeting_token !==
  undefined

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
        if (isUpdateQuestionPayload(payload)) {
          return (
            <UpdateQuestionGuardModal
              guardType="Unauthorized"
              questionId={payload!.questionId}
            />
          )
        }
      case "updateQuestion:Forbidden":
        if (isUpdateQuestionPayload(payload)) {
          return (
            <UpdateQuestionGuardModal
              guardType="Forbidden"
              questionId={payload!.questionId}
            />
          )
        }
      case "signup":
        return <SignupGuardModal />
      case "userProfile":
        return <UserProfileGuardModal />
      case "profile":
        return <MyPageGuardModal />
      case "updateCodingMeeting:Unauthorized":
        if (isUpdateCodingMeetingPayload(payload)) {
          return (
            <UpdateCodingMeetingGuardModal
              guardType="Unauthorized"
              coding_meeting_token={payload!.coding_meeting_token}
            />
          )
        }
      case "updateCodingMeeting:Forbidden":
        if (isUpdateCodingMeetingPayload(payload)) {
          return (
            <UpdateCodingMeetingGuardModal
              guardType="Forbidden"
              coding_meeting_token={payload!.coding_meeting_token}
            />
          )
        }
      case "oauth":
        return <OAuthGuardModal />
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
