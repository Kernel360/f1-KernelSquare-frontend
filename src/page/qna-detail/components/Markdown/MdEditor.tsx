"use client"

import "@toast-ui/editor/dist/toastui-editor.css"
import "tui-color-picker/dist/tui-color-picker.css"
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css"
import colorSyntax from "@toast-ui/editor-plugin-color-syntax"
import { Editor } from "@toast-ui/react-editor"
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight"
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css"
import { RefObject } from "react"

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
          plugins={[colorSyntax, codeSyntaxHighlight]}
        />
      )}
    </div>
  )
}

export default MdEditor
