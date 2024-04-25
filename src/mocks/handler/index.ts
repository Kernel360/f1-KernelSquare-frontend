import { answerHandler } from "./answer"
import { authHandler } from "./auth"
import { codingMeetingHandler } from "./coding-meeting"
import { coffeeChatHandler } from "./coffee-chat"
import { memberHandler } from "./member"
import { mockNotificationApi } from "./notification"
import { questionHandler } from "./question"
import { searchHandler } from "./search"
import { techTagsHandler } from "./techs"
import { uploadHandler } from "./upload"

export const mswHandler = [
  ...authHandler,
  ...memberHandler,
  ...questionHandler,
  ...answerHandler,
  ...uploadHandler,
  ...coffeeChatHandler,
  ...searchHandler,
  ...techTagsHandler,
  ...codingMeetingHandler,
  ...mockNotificationApi,
]
