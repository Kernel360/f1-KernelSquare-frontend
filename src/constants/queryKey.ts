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

export const USER_QUERY_KEY = {
  getUser(userId: number) {
    return ["user", userId, "profile"]
  },
  updateProfileImage(userId: number) {
    return ["user", userId, "update", "image"]
  },
  updateIntroduction(userId: number) {
    return ["user", userId, "update", "introduction"]
  },
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
  createAIanswer(questionId: number) {
    return ["question", questionId, "aiAnswer"]
  },
  createAnswer(questionId: number) {
    return ["question", questionId, "answer", "create"]
  },
  deleteAnswer(answerId: number) {
    return ["question", "answer", "delete", answerId]
  },
  updateAnswer(answerId: number) {
    return ["question", "answer", "update", answerId]
  },
  voteAnswer(answerId: number) {
    return ["question", "answer", "vote", answerId]
  },
  deleteVoteAnswer(answerId: number) {
    return ["question", "answer", "vote", "delete", answerId]
  },
}

export const COFFEE_CHAT_QUERY_KEY = {
  getChatList(page?: number) {
    return page === undefined ? ["chat", "list"] : ["chat", "list", page]
  },
  createCoffeeChat: ["chat", "create"],
  updateCoffeeChat(articleId: number) {
    return ["chat", "update", articleId]
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
