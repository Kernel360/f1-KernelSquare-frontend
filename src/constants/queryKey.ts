import { UploadImagesCategory } from "@/interfaces/dto/upload/upload-images.dto"

const queryKey = {
  member: "member",
  updateInfo: "updateInfo",
  question: "question",
  answer: "answer",
  user: "user",
  profile: "profile",
  chat: "chat",
  myChatReservation: "myChatReservation",
  codingMeeting: "codingMeeting",
  uploadImageMutation: "uploadImage",
}

export const QUESTION_QUERY_KEY = {
  questionList: ["question", "list"],
  questionDetail(id: number) {
    return ["question", id]
  },
  deleteQuestion(questionId: number) {
    return ["question", "delete", questionId]
  },
  questionAnswers(questionId: number) {
    return ["question", "answer", questionId]
  },
  createAnswer(questionId: number) {
    return ["question", questionId, "answer", "create"]
  },
  deleteAnswer(answerId: number) {
    return ["question", "answer", "delete", answerId]
  },
}

export const IMAGE_QUERY_KEY = {
  uploadImageWithoutCategory: ["upload", "image"],
  uploadImageWithCategory(category: UploadImagesCategory) {
    return ["upload", "image", category]
  },
  deleteImage: ["delete", "image"],
}

export default queryKey
