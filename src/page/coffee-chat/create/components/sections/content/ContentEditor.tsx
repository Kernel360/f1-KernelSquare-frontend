"use client"

import { useRef } from "react"
import MdEditor from "@/components/shared/markdown/Editor/MarkdownEditor"
import { Editor } from "@toast-ui/react-editor"

interface ContentEditorProps {
  onChange: (markdown: string) => void
  initialValue?: string
}

function ContentEditor({ onChange, initialValue = "" }: ContentEditorProps) {
  const editorRef = useRef<Editor>(null)

  return (
    <MdEditor
      ref={editorRef}
      initialValue={initialValue}
      isImage={false}
      placeholder="생성할 커피챗에 대해 설명해보세요."
      onChange={() => {
        onChange(editorRef.current?.getInstance().getMarkdown() ?? "")
      }}
    />
  )
}

export default ContentEditor
