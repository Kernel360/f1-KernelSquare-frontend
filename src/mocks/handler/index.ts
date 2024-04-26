import { mockAuthApi } from "./auth"
import { mockNotificationApi } from "./notification"
import { mockQnaApi } from "./qna"
import { mockMemberApi } from "./member"
import { mockUploadApi } from "./upload"
import { mockCoffeeChatApi } from "./coffee-chat"
import { mockSearchApi } from "./search"
import { mockTechTagApi } from "./tech-tag"
import { mockCodingMeetingApi } from "./coding-meeting"

export const mswHandler = [
  ...mockAuthApi,
  ...mockQnaApi,
  ...mockMemberApi,
  ...mockUploadApi,
  ...mockCoffeeChatApi,
  ...mockSearchApi,
  ...mockTechTagApi,
  ...mockCodingMeetingApi,
  ...mockNotificationApi,
]
