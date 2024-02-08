"use client"

import MarkdownEditor from "@/components/shared/markdown/Editor/MarkdownEditor"
import { useSetRecoilState } from "recoil"
import type { Editor } from "@toast-ui/react-editor"
import type { RefObject } from "react"
import { coffeeChatEditorLoadedAtomFamily } from "@/recoil/atoms/coffeechatEditor"

interface EditorProps {
  previous?: string
  editorRef: RefObject<Editor>
  userId: number
}

const MdEditorContainer: React.FC<EditorProps> = ({
  previous,
  editorRef,
  userId,
}) => {
  const setLoaded = useSetRecoilState(coffeeChatEditorLoadedAtomFamily(userId))

  return (
    <div className="text-[20px] text-left">
      {editorRef && (
        <MarkdownEditor
          ref={editorRef}
          initialValue={previous}
          isImage={false}
          setLoaded={setLoaded}
          placeholder="생성할 커피챗에 대해 설명해보세요."
        />
      )}
    </div>
  )
}

export default MdEditorContainer
