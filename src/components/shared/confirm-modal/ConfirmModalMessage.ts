import { confirmMessage } from "@/constants/message"

export type MessageKey =
  | "uploadProfileImage"
  | "deleteContent"
  | "cancleVote"
  | "reserveCoffeeChat"

const ConfirmModalMessage = {
  uploadProfileImage: confirmMessage.editProfileImage,
  deleteContent: confirmMessage.deleteContent,
  cancleVote: confirmMessage.cancleVote,
  reserveCoffeeChat: confirmMessage.reserveCoffeeChat,
} as const

export default ConfirmModalMessage
