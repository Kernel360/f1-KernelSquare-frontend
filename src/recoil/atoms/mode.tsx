import { atom } from "recoil"

// 마이페이지 소개글 수정 상태
export const EditMode = atom<boolean>({
  key: "EditMode-atom",
  default: false,
})

// Q&A 댓글 작성 가능 상태
export const AnswerMode = atom<boolean>({
  key: "AnswerMode-atom",
  default: false,
})
