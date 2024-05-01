import { mockCreateCodingMeetingCommentApi } from "./create-comment"
import { mockDeleteCodingMeetingCommentApi } from "./delete-comment"
import { mockGetCodingMeetingCommentApi } from "./get-comment"
import { mockUpdateCodingMeetingCommentApi } from "./update-comment"

export const mockCodingMeetingCommentApi = [
  mockGetCodingMeetingCommentApi,
  mockCreateCodingMeetingCommentApi,
  mockUpdateCodingMeetingCommentApi,
  mockDeleteCodingMeetingCommentApi,
]
