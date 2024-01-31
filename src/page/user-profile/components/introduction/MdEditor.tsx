"use client"

import MarkdownEditor from "@/components/shared/markdown/Editor/MarkdownEditor"
import type { EditorProps } from "./MdEditor.types"

const MdEditorContainer: React.FC<EditorProps> = ({ previous, editorRef }) => {
  return (
    <div className="text-[20px] text-left">
      {editorRef && <MarkdownEditor ref={editorRef} initialValue={previous} />}
    </div>
  )
}

export default MdEditorContainer
