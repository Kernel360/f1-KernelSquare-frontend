import type { Editor } from "@toast-ui/react-editor"
import type { RefObject } from "react"

export interface EditorProps {
  previous?: string
  editorRef: RefObject<Editor>
  userId: number
}
