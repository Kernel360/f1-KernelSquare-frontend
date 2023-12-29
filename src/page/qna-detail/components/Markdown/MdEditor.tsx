"use client"

import "prismjs/themes/prism.css"
import Prism from "prismjs"

import "tui-color-picker/dist/tui-color-picker.css"
import { Editor } from "@toast-ui/react-editor"
// 텍스트 색상 변경 지원
import colorSyntax from "@toast-ui/editor-plugin-color-syntax"
// 코드 하이라이트 지원
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css"
// 전체 언어 지원
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js"
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css"
import type { RefObject } from "react"

interface EditorProps {
  previous?: string
  editorRef: RefObject<Editor>
}

const MdEditor: React.FC<EditorProps> = ({ previous, editorRef }) => {
  return (
    <div>
      {editorRef && (
        <Editor
          ref={editorRef}
          initialValue={previous || " "}
          initialEditType="markdown"
          previewStyle="tab"
          usageStatistics={false}
          hideModeSwitch={true}
          height="300px"
          // toolbarItems={toolbarItems}
          useCommandShortcut={true}
          plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
        />
      )}
    </div>
  )
}

export default MdEditor
