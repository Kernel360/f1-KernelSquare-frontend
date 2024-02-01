import { atom, atomFamily } from "recoil"

// 마이페이지 소개글 수정 상태
export const IntroductionEditMode = atom<boolean>({
  key: "IntroductionEditMode-atom",
  default: false,
})

// Q&A 답변 수정 가능 상태
export const AnswerEditMode = atomFamily<boolean, number>({
  key: "AnswerEditMode-atom",
  default: (id: number) => false,
})

// Q&A 답변 작성 가능 상태
export const AnswerWriteMode = atomFamily<boolean, number>({
  key: "AnswerWriteMode-atom",
  default: (id: number) => false,
})
