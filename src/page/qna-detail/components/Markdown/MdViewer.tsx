import Prism from "prismjs"
import "@toast-ui/editor/dist/toastui-editor.css"
import { Viewer } from "@toast-ui/react-editor"
import "prismjs/themes/prism.css"
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css"
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js"
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js"
import { handleViewerLink } from "@/util/editor"
import { twJoin } from "tailwind-merge"

export interface ViewerProps {
  content: string
}

const MdViewer: React.FC<ViewerProps> = ({ content }) => {
  const viewerClassName = twJoin([
    "[&_.toastui-editor-contents]:text-base",
    "[&_.toastui-editor-contents_h1]:leading-snug",
    "[&_.toastui-editor-contents_h2]:leading-snug",
    "[&_.toastui-editor-contents_h3]:leading-snug",
    "[&_.toastui-editor-contents_h4]:leading-snug",
    "[&_.toastui-editor-contents_h5]:leading-snug",
    "[&_.toastui-editor-contents_h6]:leading-snug",
  ])

  return (
    <div>
      {content && (
        <div
          className={viewerClassName}
          onClick={(e) => handleViewerLink("question")(e)}
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
