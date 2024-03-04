"use client"

import MarkdownEditor from "@/components/shared/markdown/Editor/MarkdownEditor"
import { useSetRecoilState } from "recoil"
import { introductionEditorLoadedAtomFamily } from "@/recoil/atoms/introductionEditor"
import type { Editor } from "@toast-ui/react-editor"
import type { RefObject } from "react"
import type { EditorType } from "@toast-ui/editor"

interface EditorProps {
  previous?: string
  editorRef: RefObject<Editor>
  userId: number
  onChange?: (editorType: EditorType) => void
}

const MdEditorContainer: React.FC<EditorProps> = ({
  previous,
  editorRef,
  userId,
  onChange,
}) => {
  const setLoaded = useSetRecoilState(
    introductionEditorLoadedAtomFamily(userId),
  )

  return (
    <div className="text-[20px] text-left">
      {editorRef && (
        <MarkdownEditor
          ref={editorRef}
          initialValue={previous}
          isImage={false}
          onChange={onChange}
          setLoaded={setLoaded}
          placeholder="자기소개를 작성해주세요"
        />
      )}
    </div>
  )
}

export default MdEditorContainer
