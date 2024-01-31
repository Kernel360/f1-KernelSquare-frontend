"use client"

import MarkdownEditor from "@/components/shared/markdown/Editor/MarkdownEditor"
import type { EditorType } from "@toast-ui/editor"
import type { Editor } from "@toast-ui/react-editor"
import type { RefObject } from "react"

export interface EditorProps {
  previous?: string
  editorRef: RefObject<Editor>
  onChange?: (editorType: EditorType) => void
}

const MdEditor: React.FC<EditorProps> = ({ previous, editorRef, onChange }) => {
  return (
    <div className="text-[20px] text-left">
      {editorRef && (
        <MarkdownEditor
          ref={editorRef}
          initialValue={previous}
          onChange={onChange}
        />
      )}
    </div>
  )
}

export default MdEditor
