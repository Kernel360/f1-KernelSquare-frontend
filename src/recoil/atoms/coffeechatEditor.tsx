import Editor from "@toast-ui/editor"
import { atomFamily } from "recoil"

interface CoffeeChatEditorState {
  introduction: string
}

export const coffeeChatEditorAtomFamily = atomFamily<
  CoffeeChatEditorState,
  string
>({
  key: "coffeechat-editor-atom-family",
  default: {
    introduction: "",
  },
})

export const editorRefAtomFamily = atomFamily<Editor | null, any>({
  key: "editor-ref-atom-family",
  default: null,
})

export const coffeeChatEditorLoadedAtomFamily = atomFamily<boolean, number>({
  key: "cofeechat-editor-loaded-atom-family",
  default: false,
})
