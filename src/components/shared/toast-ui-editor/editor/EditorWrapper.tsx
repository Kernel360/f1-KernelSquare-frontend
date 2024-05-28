"use client"

import { Editor, EditorProps } from "@toast-ui/react-editor"
import { MutableRefObject, useLayoutEffect } from "react"

export type EditorRefObj = MutableRefObject<Editor | null>
export type HookCallback = (url: string, text?: string) => void

interface EditorWrapperProps extends EditorProps {
  mdTabVisible?: boolean
  forwardedRef: React.ForwardedRef<Editor>
}

function EditorWrapper({
  forwardedRef,
  mdTabVisible = true,
  autofocus = false,
  ...props
}: EditorWrapperProps) {
  const editorRef = forwardedRef as EditorRefObj

  useLayoutEffect(() => {
    const editorRefObj = editorRef.current

    const handleMdEditorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      !!target.closest(".placeholder") &&
        editorRefObj?.getInstance().setMarkdown("", true)
    }

    if (editorRefObj) {
      editorRefObj.getRootElement().spellcheck = false

      const editorInstance = editorRefObj.getInstance()

      editorInstance.setMarkdown(editorRefObj.props.initialValue ?? "", false)
      editorInstance
        .getEditorElements()
        .mdEditor.addEventListener("click", handleMdEditorClick)

      if (!autofocus) {
        editorInstance.blur()
        window.scroll({ top: 0 })
      }
    }

    return () => {
      editorRefObj
        ?.getInstance()
        .getEditorElements()
        .mdEditor.removeEventListener("click", handleMdEditorClick)

      editorRefObj?.getInstance().destroy()
    }
  }, []) /* eslint-disable-line */

  useLayoutEffect(() => {
    const mdTab = editorRef.current
      ?.getRootElement()
      .querySelector(".toastui-editor-md-tab-container") as
      | HTMLDivElement
      | null
      | undefined

    if (mdTab) {
      mdTabVisible
        ? (mdTab.style.display = "block")
        : (mdTab.style.display = "none")
    }
  }, [editorRef, mdTabVisible])

  return <Editor ref={forwardedRef} autofocus={autofocus} {...props} />
}

export default EditorWrapper
