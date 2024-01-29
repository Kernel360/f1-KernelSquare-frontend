"use client"

import MarkdownEditor from "@/components/shared/markdown/Editor/MarkdownEditor"
import type { Editor } from "@toast-ui/react-editor"
import type { RefObject } from "react"

export interface EditorProps {
  previous?: string
  editorRef: RefObject<Editor>
}

const MdEditor: React.FC<EditorProps> = ({ previous, editorRef }) => {
  return (
    <div className="text-[20px] text-left">
      {editorRef && <MarkdownEditor ref={editorRef} initialValue={previous} />}
    </div>
  )
}

export default MdEditor
