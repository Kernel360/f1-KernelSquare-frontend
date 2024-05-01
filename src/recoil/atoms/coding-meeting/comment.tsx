import { atom } from "recoil"

export interface CodingMeetingEditCommentAtom {
  editingCommentToken: string | null
}

export const codingMeetingEditCommentAtom = atom<CodingMeetingEditCommentAtom>({
  key: "coding-meeting-comment-atom",
  default: {
    editingCommentToken: null,
  },
})
