import { atom } from "recoil"

interface CodingMeetingEditCommentAtom {
  editingCommentToken: string | null
  comment: string
}

export const codingMeetingEditCommentAtom = atom<CodingMeetingEditCommentAtom>({
  key: "coding-meeting-comment-atom",
  default: {
    editingCommentToken: null,
    comment: "",
  },
})
