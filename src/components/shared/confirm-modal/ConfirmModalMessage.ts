import { confirmMessage } from "@/constants/message"

export type MessageKey = "uploadProfileImage" | "deleteContent" | "cancleVote"

const ConfirmModalMessage = {
  uploadProfileImage: confirmMessage.editProfileImage,
  deleteContent: confirmMessage.deleteContent,
  cancleVote: confirmMessage.cancleVote,
} as const

export default ConfirmModalMessage
