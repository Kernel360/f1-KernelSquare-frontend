import { APIResponse } from "../api-response"

interface QnaSEO {
  question_id: number
}

interface GetQnaSEOListPayload {
  question_id_list: Array<QnaSEO>
}

export interface GetQnaSEOResponse extends APIResponse<GetQnaSEOListPayload> {}
