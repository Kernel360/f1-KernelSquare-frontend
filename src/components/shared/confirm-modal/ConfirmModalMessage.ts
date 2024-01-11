import { confirmMessage } from "@/constants/message"

export type MessageKey = "uploadProfileImage" | "deleteContent"

const ConfirmModalMessage = {
  uploadProfileImage: confirmMessage.editProfileImage,
  deleteContent: confirmMessage.deleteContent,
} as const

export default ConfirmModalMessage
