import { mockCreateQuestionApi } from "./create-question"
import { mockDeleteQuestionApi } from "./delete-question"
import { mockGetQuestionDetailApi } from "./get-question-detail"
import { mockGetQuestionListApi } from "./get-question-list"
import { mockUpdateQuestionApi } from "./update-question"

export const mockQuestionApi = [
  mockGetQuestionListApi,
  mockGetQuestionDetailApi,
  mockCreateQuestionApi,
  mockDeleteQuestionApi,
  mockUpdateQuestionApi,
]
