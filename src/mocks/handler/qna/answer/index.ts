import { mockCreateAiAnswerApi } from "./ai-answer"
import { mockCreateAnswerApi } from "./create-answer"
import { mockDeleteAnswerApi } from "./delete-answer"
import { mockGetAnswerApi } from "./get-answer"
import { mockUpdateAnswerApi } from "./update-answer"
import { mockVoteApi } from "./vote"

export const mockAnswerApi = [
  mockGetAnswerApi,
  mockCreateAnswerApi,
  mockUpdateAnswerApi,
  mockDeleteAnswerApi,
  mockCreateAiAnswerApi,
  ...mockVoteApi,
]
