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
        <div
          className="[&_.toastui-editor-contents]:text-[20px]"
          onClick={(e) => {
            if ((e.target as HTMLElement).tagName !== "A") return

            const target = e.target as HTMLAnchorElement

            if (
              !target.href.startsWith("http://") ||
              !target.href.startsWith("https://")
            ) {
              e.preventDefault()

              const origin = `${window.location.origin}/question`

              const targetURL = target.href.replace(`${origin}/`, "")
              const newLink = `https://${targetURL}`

              const linkElement = document.createElement("a")
              linkElement.href = newLink
              linkElement.target = "_blank"

              linkElement.click()
            }
          }}
        >
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
