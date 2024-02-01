import Editor from "@toast-ui/editor"
import { atomFamily } from "recoil"

interface IntroductionEditorState {
  introduction: string
}

export const introductionEditorAtomFamily = atomFamily<
  IntroductionEditorState,
  string
>({
  key: "introduction-editor-atom-family",
  default: {
    introduction: "",
  },
})

export const editorRefAtomFamily = atomFamily<Editor | null, any>({
  key: "editor-ref-atom-family",
  default: null,
})

export const introductionEditorLoadedAtomFamily = atomFamily<boolean, string>({
  key: "introduction-editor-loaded-atom-family",
  default: false,
})
