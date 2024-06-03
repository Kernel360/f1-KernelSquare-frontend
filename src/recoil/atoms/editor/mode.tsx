import { atom } from "recoil"

interface AnswerEditState {
  editTargetAnswerId: number | null
}

// 마이페이지 소개글 수정 상태
export const IntroductionEditModeAtom = atom<boolean>({
  key: "IntroductionEditMode-atom",
  default: false,
})

// 답변 에디터 수정 관련
export const AnswerEditStateAtom = atom<AnswerEditState>({
  key: "answer-editstate-atom-key",
  default: {
    editTargetAnswerId: null,
  },
})
