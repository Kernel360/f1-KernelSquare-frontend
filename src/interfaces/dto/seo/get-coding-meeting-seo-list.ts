import { APIResponse } from "../api-response"

interface CodingMeetingSEO {
  coding_meeting_token: string
}

interface GetCodingMeetingSEOListPayload {
  coding_meeting_token_list: Array<CodingMeetingSEO>
}

export interface GetCodingMeetingSEOResponse
  extends APIResponse<GetCodingMeetingSEOListPayload> {}
