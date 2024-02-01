"use client"

import "prismjs/themes/prism.css"
import Prism from "prismjs"

import { ToastUiEditor } from "@/components/shared/toast-ui-editor"
import { Editor as ToastEditor, EditorProps } from "@toast-ui/react-editor"
import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from "react"
import Button from "@/components/shared/button/Button"
import { twMerge } from "tailwind-merge"
import { contentEditorToolbarItems } from "@/constants/editor"
import { EditorRefObj } from "@/components/shared/toast-ui-editor/editor/EditorWrapper"
import { useSetRecoilState } from "recoil"
// 텍스트 색상 변경 지원
import colorSyntax from "@toast-ui/editor-plugin-color-syntax"
import "tui-color-picker/dist/tui-color-picker.css"
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css"
// 코드 하이라이트 지원
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js"
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js"
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css"
import { answerEditorLoadedAtomFamily } from "@/recoil/atoms/answerEditor"
// 전체 언어 지원

type MdTabMode = "write" | "preview"

type MarkdownEditorProps = Partial<EditorProps> & {
  answerId: number
}

const MarkdownEditor = (
  {
    minHeight = "300px",
    answerId,
    onLoad,
    hooks,
    ...props
  }: MarkdownEditorProps,
  ref: ForwardedRef<ToastEditor>,
) => {
  const editorRef = ref as EditorRefObj

  const setLoaded = useSetRecoilState(answerEditorLoadedAtomFamily(answerId))

  const [mdTabVisible, setMdTabVisible] = useState(true)
  const [mode, setMode] = useState<MdTabMode>("write")

  const classNames = (active: boolean) =>
    twMerge([
      "font-normal text-xs rounded-[4px] border-colorsGray px-4 py-2 w-[84px] rounded-br-none rounded-bl-none border-l-0 first:border-l-[1px]",
      active
        ? "text-[#555] bg-white border-b-[#f7f9fc]"
        : "text-[#969aa5] bg-[#eaedf1]",
    ])

  const handleMdTab = () => {
    if (window.innerWidth < 480) {
      setMdTabVisible(false)

      return
    }

    setMdTabVisible(true)
  }

  const handleMdTabMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    const mode = e.currentTarget.dataset["mdTabMode"] as MdTabMode

    setMode(mode)

    if (editorRef.current) {
      const instance = editorRef.current.getInstance()
      mode === "write"
        ? instance?.eventEmitter.emit("changePreviewTabWrite")
        : instance?.eventEmitter.emit("changePreviewTabPreview")

      mode === "write" && instance?.focus()
    }
  }

  const handleResize = useCallback((e: UIEvent) => {
    handleMdTab()
  }, [])

  const handleLoad = async (editor: ToastEditor) => {
    handleMdTab()

    window.addEventListener("resize", handleResize)

    setLoaded(true)

    queueMicrotask(() => {
      if (onLoad) {
        onLoad(editorRef.current)
      }
    })
  }

  useEffect(() => {
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [handleResize])

  return (
    <div
      className={
        "relative z-[1] [&_.toastui-editor-popup]:toastify:!ml-0 [&_.toastui-editor-defaultUI-toolbar]:!flex-wrap [&_.toastui-editor-dropdown-toolbar]:!max-w-full [&_.toastui-editor-dropdown-toolbar]:!h-max [&_.toastui-editor-dropdown-toolbar]:flex-wrap [&_.toastui-editor-main-container]:break-all"
      }
    >
      <div className="flex w-full -mt-2 box-border pl-4 relative top-2 z-[1] editor:hidden">
        <Button
          data-md-tab-mode="write"
          buttonTheme="third"
          className={classNames(mode === "write")}
          onClick={handleMdTabMode}
        >
          write
        </Button>
        <Button
          data-md-tab-mode="preview"
          buttonTheme="third"
          className={classNames(mode === "preview")}
          onClick={handleMdTabMode}
        >
          preview
        </Button>
      </div>
      <ToastUiEditor
        ref={ref}
        mdTabVisible={mdTabVisible}
        toolbarItems={contentEditorToolbarItems}
        placeholder="질문을 작성해주세요"
        initialEditType="markdown"
        previewStyle="tab"
        hideModeSwitch
        usageStatistics={false}
        height="auto"
        minHeight={minHeight}
        onLoad={handleLoad}
        hooks={hooks}
        /**@ts-ignore*/
        plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
        {...props}
      />
    </div>
  )
}

export default forwardRef(MarkdownEditor)
