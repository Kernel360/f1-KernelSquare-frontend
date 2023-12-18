export interface APIResponse<T = string> {
  status: number
  msg: string
  data?: T
}

/*
  [TODO] pagination
  
  백엔드 pagenation api 응답 구조에 따라 수정될 수 있음
*/

export interface PaginationParams {
  page?: number
  limit?: number
}

export interface PaginationPayload {
  nextPage?: number | null
}

export interface APIPagenationResponse<T = string>
  extends APIResponse<{ payload: T } & PaginationPayload> {}
