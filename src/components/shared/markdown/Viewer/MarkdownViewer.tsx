import Prism from "prismjs"
import "@toast-ui/editor/dist/toastui-editor.css"
import { Viewer } from "@toast-ui/react-editor"
import "prismjs/themes/prism.css"
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css"
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js"
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js"

export interface ViewerProps {
  content: string
}

const MdViewer: React.FC<ViewerProps> = ({ content }) => {
  return (
    <div>
      {content && (
        <div className="[&_.toastui-editor-contents]:text-base">
          <Viewer
            initialValue={content || " "}
            /*@ts-ignore*/
            plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
          />
        </div>
      )}
    </div>
  )
}

export default MdViewer
