"use client"

import MarkdownEditor from "@/components/shared/markdown/Editor/MarkdownEditor"
import type { EditorProps } from "./MdEditor.types"
import { useSetRecoilState } from "recoil"
import { introductionEditorLoadedAtomFamily } from "@/recoil/atoms/introductionEditor"

const MdEditorContainer: React.FC<EditorProps> = ({
  previous,
  editorRef,
  userId,
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
          setLoaded={setLoaded}
        />
      )}
    </div>
  )
}

export default MdEditorContainer
