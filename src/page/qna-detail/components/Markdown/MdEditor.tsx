"use client"

import MarkdownEditor from "@/components/shared/markdown/Editor/MarkdownEditor"
import { errorMessage } from "@/constants/message"
import {
  MAXIMUM_UPLOAD_IMAGE_LENGTH,
  useToastUiEditorImageUploadHook,
} from "@/hooks/useToastUiEditorImageUploadHook"
import {
  answerEditorAtomFamily,
  answerEditorLoadedAtomFamily,
} from "@/recoil/atoms/answerEditor"
import { revalidatePage } from "@/util/actions/revalidatePage"
import type { EditorType } from "@toast-ui/editor"
import type { Editor } from "@toast-ui/react-editor"
import type { RefObject } from "react"
import { toast } from "react-toastify"
import { useRecoilState, useSetRecoilState } from "recoil"

export interface EditorProps {
  answerId: number
  previous?: string
  editorRef: RefObject<Editor>
  onChange?: (editorType: EditorType) => void
}

const MdEditor: React.FC<EditorProps> = ({
  answerId,
  previous,
  editorRef,
  onChange,
}) => {
  const [editorState, setEditorState] = useRecoilState(
    answerEditorAtomFamily(answerId),
  )

  const setLoaded = useSetRecoilState(answerEditorLoadedAtomFamily(answerId))

  const { uploadImageHook, uploadImageStatus } =
    useToastUiEditorImageUploadHook({
      atomKey: answerId + "",
      category: "answer",
      onUploadSuccess({ file, linkUrl }) {
        setEditorState((prev) => ({
          ...prev,
          fileUploadImageLinks: [
            ...Array.from(
              new Set([...editorState.fileUploadImageLinks, linkUrl]),
            ),
          ],
        }))
      },
      onUploadError({ action, errorCase }) {
        if (errorCase === "unauthorized") {
          revalidatePage("/question/[id]", "page")

          return
        }

        toast.error(errorMessage.failToUploadImage, {
          position: "top-center",
        })
      },
      onError({ errorCase }) {
        if (errorCase === "isMaximum") {
          toast.error(
            `이미지 파일 업로드는 최대${MAXIMUM_UPLOAD_IMAGE_LENGTH}장 가능합니다`,
            { position: "top-center" },
          )

          return
        }

        toast.error(errorMessage.failToUploadImage, { position: "top-center" })
      },
    })

  return (
    <div className="text-[20px] text-left">
      {editorRef && (
        <MarkdownEditor
          isImage
          ref={editorRef}
          initialValue={previous}
          onChange={onChange}
          setLoaded={setLoaded}
          hooks={{
            addImageBlobHook: uploadImageHook,
          }}
        />
      )}
    </div>
  )
}

export default MdEditor
