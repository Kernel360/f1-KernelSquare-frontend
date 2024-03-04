import { atom } from "recoil"

interface CodingMeetingEditCommentAtom {
  editingCommentToken: string | null
}

export const codingMeetingEditCommentAtom = atom<CodingMeetingEditCommentAtom>({
  key: "coding-meeting-comment-atom",
  default: {
    editingCommentToken: null,
  },
})
