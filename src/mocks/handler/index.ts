import { authHandler } from "./auth"
import { memberHandler } from "./member"
import { questionHandler } from "./question"

export const mswHandler = [...authHandler, ...memberHandler, ...questionHandler]
