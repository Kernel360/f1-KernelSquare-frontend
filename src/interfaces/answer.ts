/**
 * Answer (답변)
 *
 * ---
 *
 * **answer_id** id(number)
 *
 * **question_id** 질문id(number)
 *
 * **content** 답변 본문(string)
 *
 * **rank_image_url** 답변한 유저 레벨 이미지(string)
 *
 * **member_image_url** 답변한 유저 프로필 이미지(string)
 *
 * **create_by** 답변한 유저 닉네임(string)
 *
 * **author_level** 답변한 유저 레벨(number)
 *
 * **answer_image_url** 답변에 포함된 이미지(string)
 *
 * **created_date** 답변 생성일(Date)
 *
 * **modified_date** 답변 수정일(Date)
 *
 * **vote_count** 답변 추천수(number)
 *
 * **vote_status** 답변 투표 상태 (1: 추천, 0: 투표 x, -1: 비추천)
 */
export interface Answer {
  answer_id: number
  question_id: number
  content: string
  rank_image_url: string | null
  member_image_url: string | null
  created_by: string
  author_level: number
  answer_image_url: string
  created_date: string
  modified_date: string
  vote_count: number
  vote_status: VoteStatus
}

export enum VoteStatus {
  LIKED = 1,
  NONE = 0,
  DISLIKED = -1,
}
