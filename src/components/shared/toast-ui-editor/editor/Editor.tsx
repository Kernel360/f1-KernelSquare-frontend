"use client"

import { Editor as ToastEditor, EditorProps } from "@toast-ui/react-editor"
import dynamic from "next/dynamic"
import { forwardRef } from "react"
import Skeleton from "react-loading-skeleton"

const EditorWrapper = dynamic(() => import("./EditorWrapper"), {
  ssr: false,
  loading(loadingProps) {
    return (
      <div className="relative h-[346px]">
        <Skeleton height={"100%"} baseColor="#eee" />
        <div className="absolute top-0 left-0 flex justify-center items-center w-full z-[1] h-full">
          에디터 로딩 중
        </div>
      </div>
    )
  },
})

const Editor = forwardRef<
  ToastEditor,
  EditorProps & { mdTabVisible?: boolean }
>(function ToastUiWithRefEditor({ mdTabVisible, ...props }, ref) {
  return (
    <EditorWrapper forwardedRef={ref} mdTabVisible={mdTabVisible} {...props} />
  )
})

export default Editor
