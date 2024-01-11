"use client"

import { useCallback, useLayoutEffect } from "react"
import AskQustionGuardModal from "./AskQustionGuardModal"
import SignupGuardModal from "./SignupGuardModal"
import UserProfileGuardModal from "./UserProfileGuardModal"
import { useClientSession } from "@/hooks/useClientSession"
import { getAuthCookie } from "@/util/actions/cookie"
import { logout } from "@/service/auth"

interface AuthGuardModalProps {
  page: "question" | "signup" | "userProfile"
}

function AuthGuardModal({ page }: AuthGuardModalProps) {
  const { clientSessionLogout } = useClientSession()

  const RenderAuthModal = useCallback(() => {
    switch (page) {
      case "question":
        return <AskQustionGuardModal />
      case "signup":
        return <SignupGuardModal />
      case "userProfile":
        return <UserProfileGuardModal />
      default:
        return null
    }
  }, []) /* eslint-disable-line */

  const sessionLogout = useCallback(async () => {
    const { accessToken, refreshToken } = await getAuthCookie()

    if (accessToken && refreshToken) {
      logout({ access_token: accessToken, refresh_token: refreshToken })
    }

    clientSessionLogout()
  }, [clientSessionLogout])

  useLayoutEffect(() => {
    sessionLogout()
  }, []) /* eslint-disable-line */

  return <RenderAuthModal />
}

export default AuthGuardModal
