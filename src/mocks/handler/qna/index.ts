import { mockAnswerApi } from "./answer"
import { mockQuestionApi } from "./question"

export const mockQnaApi = [...mockQuestionApi, ...mockAnswerApi]
