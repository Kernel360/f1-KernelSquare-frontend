import { answerHandler } from "./answer"
import { authHandler } from "./auth"
import { coffeeChatHandler } from "./coffee-chat"
import { memberHandler } from "./member"
import { questionHandler } from "./question"
import { uploadHandler } from "./upload"

export const mswHandler = [
  ...authHandler,
  ...memberHandler,
  ...questionHandler,
  ...answerHandler,
  ...uploadHandler,
  ...coffeeChatHandler,
]
