"use client"

import { useCallback } from "react"
import AskQustionGuardModal from "./AskQustionGuardModal"
import SignupGuardModal from "./SignupGuardModal"
import MyPageGuardModal from "./MyPageGuardModal"

interface AuthGuardModalProps {
  page: "question" | "signup" | "profile"
}

function AuthGuardModal({ page }: AuthGuardModalProps) {
  const RenderAuthModal = useCallback(() => {
    switch (page) {
      case "question":
        return <AskQustionGuardModal />
      case "signup":
        return <SignupGuardModal />
      case "profile":
        return <MyPageGuardModal />
      default:
        return null
    }
  }, []) /* eslint-disable-line */

  return <RenderAuthModal />
}

export default AuthGuardModal
