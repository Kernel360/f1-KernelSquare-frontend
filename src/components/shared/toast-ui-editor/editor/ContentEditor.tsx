"use client"

import "prismjs/themes/prism-tomorrow.css"
import "tui-color-picker/dist/tui-color-picker.css"
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css"
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css"
import Prism from "prismjs"
import { ToastUiEditor } from "@/components/shared/toast-ui-editor"
import { Editor as ToastEditor, EditorProps } from "@toast-ui/react-editor"
import colorSyntax from "@toast-ui/editor-plugin-color-syntax"
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js"
import { ForwardedRef, forwardRef, useEffect, useRef, useState } from "react"
import Button from "@/components/shared/button/Button"
import { twMerge } from "tailwind-merge"
import {
  contentEditorToolbarItemsWithImage,
  contentEditorToolbarItemsWithoutImage,
} from "@/constants/editor"
import { throttle } from "lodash-es"
import type { EditorRefObj } from "@/components/shared/toast-ui-editor/editor/EditorWrapper"

type MdTabMode = "write" | "preview"

type ContentEditorProps = Partial<
  Omit<EditorProps, "toolbarItems" | "plugins">
> & {
  includeImageToolbarItem?: boolean
  includeColorSyntaxPlugins?: boolean
}

const ContentEditor = (
  {
    minHeight = "300px",
    onLoad,
    hooks,
    placeholder,
    includeImageToolbarItem = true,
    includeColorSyntaxPlugins,
    ...props
  }: ContentEditorProps,
  ref: ForwardedRef<ToastEditor>,
) => {
  const editorRef = ref as EditorRefObj
  const wrapperRef = useRef<HTMLDivElement>(null)

  const [mdTabVisible, setMdTabVisible] = useState(true)
  const [mode, setMode] = useState<MdTabMode>("write")

  const toolbarItems = includeImageToolbarItem
    ? contentEditorToolbarItemsWithImage
    : contentEditorToolbarItemsWithoutImage

  const plugins: EditorProps["plugins"] = includeColorSyntaxPlugins
    ? [colorSyntax, [codeSyntaxHighlight as any, { highlighter: Prism }]]
    : [[codeSyntaxHighlight as any, { highlighter: Prism }]]

  const classNames = (active: boolean) =>
    twMerge([
      "font-normal text-xs rounded-[4px] border-colorsGray px-4 py-2 w-[84px] rounded-br-none rounded-bl-none border-l-0 first:border-l-[1px] border-t border-l border-r border-b-[#f7f9fc]",
      active ? "text-[#555] bg-white" : "text-[#969aa5] bg-[#eaedf1]",
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

  const handleResize = (e: UIEvent) => {
    handleMdTab()
  }

  const throttleResize = throttle(handleResize, 200)

  const handleLoad = async (editor: ToastEditor) => {
    handleMdTab()

    window.addEventListener("resize", throttleResize)

    queueMicrotask(() => {
      if (onLoad) {
        onLoad(editorRef.current)
      }
    })
  }

  useEffect(() => {
    return () => {
      window.removeEventListener("resize", throttleResize)
    }
  }, []) /* eslint-disable-line */

  return (
    <div
      ref={wrapperRef}
      className={
        "relative z-[1] [&_.toastui-editor-popup]:toastify:!ml-0 [&_.toastui-editor-defaultUI-toolbar]:!flex-wrap [&_.toastui-editor-dropdown-toolbar]:!max-w-full [&_.toastui-editor-dropdown-toolbar]:!h-max [&_.toastui-editor-dropdown-toolbar]:flex-wrap [&_.toastui-editor-toolbar-group]:flex-wrap [&_.toastui-editor-main-container]:break-all [&_.toastui-editor-contents_pre]:rounded-sm [&_.toastui-editor-contents_pre]:!bg-[#002451] [&_.toastui-editor-contents_pre_code]:text-[#ccc] [&_.toastui-editor-contents_pre_code_.token.operator]:bg-transparent"
      }
    >
      <div className="flex w-full -mt-2 box-border pt-3 pl-4 relative top-2 z-[1] bg-[#f7f9fc] border-t border-l border-r border-[#dadde6] rounded-tl rounded-tr editor:hidden">
        <Button
          data-md-tab-mode="write"
          className={classNames(mode === "write")}
          onClick={handleMdTabMode}
        >
          write
        </Button>
        <Button
          data-md-tab-mode="preview"
          className={classNames(mode === "preview")}
          onClick={handleMdTabMode}
        >
          preview
        </Button>
      </div>
      <ToastUiEditor
        ref={ref}
        mdTabVisible={mdTabVisible}
        toolbarItems={toolbarItems}
        placeholder={placeholder}
        initialEditType="markdown"
        previewStyle="tab"
        hideModeSwitch
        usageStatistics={false}
        height="auto"
        minHeight={minHeight}
        onLoad={handleLoad}
        hooks={hooks}
        plugins={plugins}
        {...props}
      />
    </div>
  )
}

export default forwardRef(ContentEditor)
