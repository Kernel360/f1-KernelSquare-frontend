import { answerHandler } from "./answer"
import { authHandler } from "./auth"
import { memberHandler } from "./member"
import { questionHandler } from "./question"
import { uploadHandler } from "./upload"

export const mswHandler = [
  ...authHandler,
  ...memberHandler,
  ...questionHandler,
  ...answerHandler,
  ...uploadHandler,
]
