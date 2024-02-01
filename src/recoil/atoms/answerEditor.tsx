import Editor from "@toast-ui/editor"
import { atomFamily } from "recoil"

interface AnswerEditorState {
  content: string
  fileUploadImageLinks: Array<string>
}

export const answerEditorAtomFamily = atomFamily<AnswerEditorState, number>({
  key: "answer-editor-atom-family",
  default: {
    content: "",
    fileUploadImageLinks: [],
  },
})

export const editorRefAtomFamily = atomFamily<Editor | null, any>({
  key: "editor-ref-atom-family",
  default: null,
})

export const answerEditorLoadedAtomFamily = atomFamily<boolean, number>({
  key: "answer-editor-loaded-atom-family",
  default: false,
})
