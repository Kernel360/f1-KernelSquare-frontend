export interface APIResponse<T = string> {
  code: number
  msg: string
  data?: T
}

/**
 * page: **요청 페이지** number <기본값 0>
 *
 * size: **페이지에서의 최대 목록 수** number <기본값 5>
 */
export interface PaginationParams {
  page?: number
  size?: number
}

/**
 * total_page: 총 페이지 수 **number**
 *
 * pageable: 응답 페이지의 리스트 아이템 개수 **number**
 *
 * is_end: 해당 페이지가 마지막 페이지인지 여부 **boolean**
 */
export interface PaginationPayload {
  pagination: {
    total_page: number
    pageable: number
    is_end: boolean
  }
}

export interface APIPagenationResponse<T = {}>
  extends APIResponse<PaginationPayload & T> {}
