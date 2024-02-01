import { atomFamily } from "recoil"
import { Editor } from "@toast-ui/react-editor"
import type { TechTag } from "@/interfaces/tech-tag"

interface QuestionEditorState {
  title: string
  content: string
  fileUploadImageLinks: Array<string>
  skills: Array<TechTag>
}

export const questionEditorAtomFamily = atomFamily<QuestionEditorState, string>(
  {
    key: "question-editor-atom-family",
    default: {
      title: "",
      content: "",
      fileUploadImageLinks: [],
      skills: [],
    },
  },
)

export const editorRefAtomFamily = atomFamily<Editor | null, any>({
  key: "editor-ref-atom-family",
  default: null,
})

export const questionEditorLoadedAtomFamily = atomFamily<boolean, string>({
  key: "question-editor-loaded-atom-family",
  default: false,
})
