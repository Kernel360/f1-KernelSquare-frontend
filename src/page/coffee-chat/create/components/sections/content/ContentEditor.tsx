"use client"

import { useRef } from "react"
import { Editor } from "@toast-ui/react-editor"
import CoffeeChatContentEditor from "@/components/shared/toast-ui-editor/editor/ContentEditor"

interface ContentEditorProps {
  onChange: (markdown: string) => void
  initialValue?: string
}

function ContentEditor({ onChange, initialValue = "" }: ContentEditorProps) {
  const editorRef = useRef<Editor>(null)

  return (
    <CoffeeChatContentEditor
      ref={editorRef}
      initialValue={initialValue}
      includeImageToolbarItem={false}
      placeholder="생성할 커피챗에 대해 설명해보세요."
      onChange={() => {
        onChange(editorRef.current?.getInstance()?.getMarkdown() ?? "")
      }}
    />
  )
}

export default ContentEditor
