import { atomFamily } from "recoil"
import { Editor } from "@toast-ui/react-editor"

export const editorRefAtomFamily = atomFamily<Editor | null, any>({
  key: "editor-ref-atom-family",
  default: null,
})
