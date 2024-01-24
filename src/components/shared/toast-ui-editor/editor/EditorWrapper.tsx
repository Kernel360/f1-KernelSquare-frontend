"use client"

import { Editor, EditorProps } from "@toast-ui/react-editor"
import { MutableRefObject, useEffect, useLayoutEffect } from "react"

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

    if (editorRefObj) {
      editorRefObj.getRootElement().spellcheck = false

      editorRefObj
        .getInstance()
        .setMarkdown(editorRefObj.props.initialValue ?? "")
    }

    return () => {
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

  useEffect(() => {
    if (!autofocus) {
      setTimeout(() => {
        editorRef.current?.getInstance().blur()
      }, 0)
    }
  }, []) /* eslint-disable-line */

  return <Editor ref={forwardedRef} autofocus={autofocus} {...props} />
}

export default EditorWrapper
