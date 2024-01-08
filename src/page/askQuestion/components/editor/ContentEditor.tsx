"use client"

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
import {
  EditorRefObj,
  HookCallback,
} from "@/components/shared/toast-ui-editor/editor/EditorWrapper"
import { uploadImage } from "@/service/upload"
import { toast } from "react-toastify"
import { AxiosError, HttpStatusCode } from "axios"
import { UploadImageResponse } from "@/interfaces/dto/upload/upload-image.dto"
import { revalidatePage } from "@/util/actions/revalidatePage"
import { useRecoilValue } from "recoil"
import {
  fileUploadImageLinksSelector,
  questionEditorState,
} from "@/recoil/atoms/questionEditor"
import { useClientSession } from "@/hooks/useClientSession"
import { ToolbarItemList } from "@/constants/toastUIEditor"

type MdTabMode = "write" | "preview"

const ContentEditor = (
  { minHeight = "300px", ...props }: Partial<EditorProps>,
  ref: ForwardedRef<ToastEditor>,
) => {
  const editorRef = ref as EditorRefObj

  const { clientSessionLogout } = useClientSession()

  const { getFileUploadImageLinks, addFileUploadImageLinks } = useRecoilValue(
    fileUploadImageLinksSelector,
  )
  const { setQuestionEditorLoaded } = useRecoilValue(questionEditorState)

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

    await setQuestionEditorLoaded(true)
  }

  async function uploadImageHook(blob: Blob | File, callback: HookCallback) {
    const fileUploadLinkSnapshot = await getFileUploadImageLinks()

    const exceedingUploadableImagesError = new Error(
      "exceeding uploadable images",
    )

    try {
      if (fileUploadLinkSnapshot.length >= 1) {
        throw exceedingUploadableImagesError
      }

      const res = await uploadImage({ image: blob })

      callback(res.data.data!.image_url, "uploadedImage")

      await addFileUploadImageLinks(res.data.data!.image_url)
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === exceedingUploadableImagesError.message) {
          toast.error("이미지 파일 업로드는 1장만 가능합니다", {
            position: "top-center",
          })

          return
        }
      }

      if (error instanceof AxiosError) {
        const { response } = error as AxiosError<UploadImageResponse>

        if (response?.status === HttpStatusCode.Unauthorized) {
          toast.error("로그인 후 다시 이용해주세요", {
            position: "top-center",
          })

          await clientSessionLogout()

          editorRef.current?.getInstance().eventEmitter.emit("pageOut")
          await revalidatePage("/question")

          return
        }

        toast.error("이미지 업로드에 실패했습니다", {
          position: "top-center",
        })

        return
      }

      toast.error("이미지 업로드에 실패했습니다", {
        position: "top-center",
      })

      return
    }
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
        toolbarItems={ToolbarItemList}
        placeholder="질문을 작성해주세요"
        initialEditType="markdown"
        previewStyle="tab"
        hideModeSwitch
        usageStatistics={false}
        height="auto"
        minHeight={minHeight}
        useCommandShortcut={true}
        onLoad={handleLoad}
        hooks={{
          addImageBlobHook: uploadImageHook,
        }}
        {...props}
      />
    </div>
  )
}

export default forwardRef(ContentEditor)
