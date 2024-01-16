"use client"

import { useCallback, useLayoutEffect } from "react"
import AskQustionGuardModal from "./AskQustionGuardModal"
import SignupGuardModal from "./SignupGuardModal"
import UserProfileGuardModal from "./UserProfileGuardModal"
import { useClientSession } from "@/hooks/useClientSession"
import { getAuthCookie } from "@/util/actions/cookie"
import { logout } from "@/service/auth"
import MyPageGuardModal from "./MyPageGuardModal"

interface AuthGuardModalProps {
  page: "question" | "signup" | "userProfile" | "profile"
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
      case "profile":
        return <MyPageGuardModal />
      default:
        return null
    }
  }, []) /* eslint-disable-line */

  return <RenderAuthModal />
}

export default AuthGuardModal
