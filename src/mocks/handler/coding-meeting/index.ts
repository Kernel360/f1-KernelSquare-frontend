import { mockCodingMeetingCommentApi } from "./comment"
import { mockCreateCodingMeetingApi } from "./create-coding-meeting"
import { mockDeleteCodingMeetingApi } from "./delete-coding-meeting"
import { mockCodingMeetingDetailApi } from "./get-coding-meeting-detail"
import { mockGetCodingMeetingListApi } from "./get-coding-meeting-list"
import { mockUpdateCodingMeetingApi } from "./update-coding-meeting"

export const mockCodingMeetingApi = [
  mockGetCodingMeetingListApi,
  mockCodingMeetingDetailApi,
  mockCreateCodingMeetingApi,
  mockDeleteCodingMeetingApi,
  mockUpdateCodingMeetingApi,
  ...mockCodingMeetingCommentApi,
]
