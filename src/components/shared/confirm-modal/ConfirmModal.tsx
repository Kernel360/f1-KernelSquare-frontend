"use client"

import { useCallback } from "react"
import UploadProfileImageModal from "./components/UploadProfileImageModal"

interface AuthGuardModalProps {
  page: "uploadProfileImage"
}

function ConfirmModal({ page }: AuthGuardModalProps) {
  const RenderConfirmModal = useCallback(() => {
    switch (page) {
      case "uploadProfileImage":
      // return <UploadProfileImageModal />
      default:
        return null
    }
  }, []) /* eslint-disable-line */

  return <RenderConfirmModal />
}

export default ConfirmModal
