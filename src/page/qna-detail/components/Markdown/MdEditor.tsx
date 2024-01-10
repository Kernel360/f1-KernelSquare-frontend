"use client"

import { Editor } from "@toast-ui/react-editor"
import { type RefObject } from "react"
import MarkdownEditor from "@/components/shared/markdown/Editor/MarkdownEditor"

interface EditorProps {
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
