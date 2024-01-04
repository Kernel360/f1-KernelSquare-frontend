"use client"

import { useCallback } from "react"
import AskQustionGuardModal from "./AskQustionGuardModal"
import SignupGuardModal from "./SignupGuardModal"

interface AuthGuardModalProps {
  page: "question" | "signup"
}

function AuthGuardModal({ page }: AuthGuardModalProps) {
  const RenderAuthModal = useCallback(() => {
    switch (page) {
      case "question":
        return <AskQustionGuardModal />
      case "signup":
        return <SignupGuardModal />
      default:
        return null
    }
  }, []) /* eslint-disable-line */

  return <RenderAuthModal />
}

export default AuthGuardModal
