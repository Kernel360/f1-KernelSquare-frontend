"use client"

import { useForm } from "react-hook-form"
import AskQuestionSection from "./AskQuestionSection"
import { Input } from "@/components/shared/input/Input"
import Spacing from "@/components/shared/Spacing"
import ContentEditor from "./editor/ContentEditor"
import { useCallback, useEffect, useRef } from "react"
import { Editor } from "@toast-ui/react-editor"
import { toast } from "react-toastify"
import ListLoading from "@/components/shared/animation/ListLoading"
import { TechTag } from "@/interfaces/tech-tag"
import {
  DELETE_IMAGE_LOCAL_STORAGE_KEY,
  MAXIMUM_SELECT_TAG_LENGTH,
  techTagList,
} from "@/constants/editor"
import SelectableTagList from "@/components/shared/tag/SelectableTagList"
import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import {
  createMockQuestion,
  updateMockQuestion,
} from "@/mocks/handler/question"
import {
  deleteImageLinkFromMarkdownEventName,
  sendEditorRefEventName,
} from "./AskQuestionPageControl"
import { useClientSession } from "@/hooks/useClientSession"
import { revalidatePage } from "@/util/actions/revalidatePage"
import { replaceAllMarkdownImageLink } from "@/util/editor"
import { useDeleteImage } from "@/hooks/image/useDeleteImage"
import { useToastUiQuestionEditor } from "@/hooks/editor/useToastuiQuestionEditor"
import {
  MAXIMUM_UPLOAD_IMAGE_LENGTH,
  useToastUiEditorImageUploadHook,
} from "@/hooks/useToastUiEditorImageUploadHook"
import { useSelectTagList } from "@/hooks/useSelectTagList"
import type { FieldErrors } from "react-hook-form"
import type {
  DeleteImageLinkFromMarkdownPayload,
  EditMode,
  SendEditorRefPayload,
} from "./AskQuestionPageControl"
import { useResetRecoilState } from "recoil"
import { searchTagAtom } from "@/recoil/atoms/tag"
import Limitation from "@/constants/limitation"

export interface QuestionEditorInitialValues {
  title: string
  content: string
  skills?: Array<TechTag> | null
  uploadImages?: Array<string> | null
}

export interface AskQuestionFormData {
  title: string
  content: string
}

export interface AskQuestionDataExceptFormdata {
  member_id: number
  skills: Array<TechTag>
  image_url: string
}

export type SubmitAskQuestionData = AskQuestionFormData &
  AskQuestionDataExceptFormdata

export type SubmitUpdateQuestionData = Omit<
  SubmitAskQuestionData,
  "member_id"
> & { question_id: number }

interface AskQustionFormProps {
  editMode: EditMode
  initialValues?: QuestionEditorInitialValues
  question_id?: number
}

function AskQuestionForm({
  initialValues,
  question_id,
  editMode,
}: AskQustionFormProps) {
  const { user } = useClientSession()

  const { register, setValue, setFocus, handleSubmit } =
    useForm<AskQuestionFormData>(
      initialValues
        ? {
            defaultValues: {
              title: initialValues.title,
              content: initialValues.content,
            },
          }
        : {},
    )

  const editorRef = useRef<Editor>(null)

  const {
    editorState,
    updateQuestionEditorState,
    clearQuestionEditorState,
    loaded,
    createQuestionSubmit,
    updateQuestionSubmit,
  } = useToastUiQuestionEditor({
    uniqueKey: editMode,
  })

  const { clearSelectedTagList } = useSelectTagList({
    uniqueKey: editMode,
    initialSelectedTagList: initialValues?.skills?.length
      ? [...initialValues.skills]
      : undefined,
  })

  const clearTagSearch = useResetRecoilState(searchTagAtom)

  const { uploadImageHook, uploadImageStatus } =
    useToastUiEditorImageUploadHook({
      atomKey: editMode,
      category: "question",
      action: editMode,
      onUploadSuccess({ file, linkUrl }) {
        updateQuestionEditorState({
          fileUploadImageLinks: [
            ...Array.from(
              new Set([...editorState.fileUploadImageLinks, linkUrl]),
            ),
          ],
        })
      },
      onUploadError({ action, errorCase }) {
        if (errorCase === "unauthorized") {
          action === "create"
            ? revalidatePage("/question")
            : revalidatePage("/question/u/[id]", "page")

          return
        }

        toast.error("이미지 업로드에 실패했습니다", {
          position: "top-center",
          toastId: "imageUploadError",
        })
      },
      onError({ errorCase }) {
        if (errorCase === "isMaximum") {
          toast.error(
            `이미지 파일 업로드는 최대${MAXIMUM_UPLOAD_IMAGE_LENGTH}장 가능합니다`,
            { position: "top-center", toastId: "imageLengthError" },
          )

          return
        }

        if (errorCase === "isMaximumSize") {
          toast.error(
            `이미지 파일 업로드는 최대 ${Limitation.image.stringifyedValue} 가능합니다`,
            {
              position: "top-center",
              toastId: "imageSizeError",
            },
          )

          return
        }

        if (errorCase === "notAllowedExtension") {
          toast.error(
            `이미지 파일 업로드는 ${Limitation.image.extension.toString()} 확장자만 가능합니다`,
            { position: "top-center", toastId: "imageExtensionError" },
          )

          return
        }

        toast.error("이미지 업로드에 실패했습니다", {
          position: "top-center",
          toastId: "imageError",
        })
      },
    })

  const selectCallback = useCallback(
    (selectedTagList: Array<TechTag>) => {
      updateQuestionEditorState({ skills: selectedTagList })
    },
    [updateQuestionEditorState],
  )

  const queryClient = useQueryClient()
  const { replace } = useRouter()

  const { deleteImage } = useDeleteImage()

  const onSubmit = async (data: AskQuestionFormData) => {
    if (!user) return

    const member_id = user.member_id

    // create
    if (editMode === "create") {
      const { success, createdQuestionId } = await createQuestionSubmit(
        member_id,
      )

      if (success) {
        if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
          createMockQuestion({
            member_id,
            title: editorState.title,
            content: editorState.content,
            image_url: editorState.fileUploadImageLinks[0] ?? "",
            skills: editorState.skills,
            question_id: createdQuestionId,
          })
        }

        toast.success("질문 생성에 성공했습니다", { position: "bottom-center" })

        queryClient.invalidateQueries({
          queryKey: ["question", "list"],
        })

        setTimeout(() => {
          replace(`/question/${createdQuestionId!}`)

          clearQuestionEditorState()
          clearSelectedTagList()
          clearTagSearch()
        }, 0)

        return
      }

      toast.error("질문 생성에 실패했습니다", {
        position: "bottom-center",
        toastId: "createQuestionError",
      })

      return
    }

    // update
    const { success } = await updateQuestionSubmit(question_id!)

    if (success) {
      const deleteImageListStorage = localStorage.getItem(
        DELETE_IMAGE_LOCAL_STORAGE_KEY,
      )

      if (deleteImageListStorage) {
        const targetImageLinks = JSON.parse(
          deleteImageListStorage,
        ) as Array<string>

        await Promise.allSettled([
          targetImageLinks.map((imageUrl) => deleteImage(imageUrl)),
        ])

        localStorage.removeItem(DELETE_IMAGE_LOCAL_STORAGE_KEY)
      }

      if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
        updateMockQuestion({
          questionId: question_id!,
          title: editorState.title,
          content: editorState.content,
          image_url: editorState.fileUploadImageLinks[0] ?? "",
          skills: editorState.skills,
        })
      }

      toast.success("질문 수정에 성공했습니다", { position: "bottom-center" })

      queryClient.invalidateQueries({
        queryKey: ["question", "list"],
      })

      queryClient.resetQueries({
        queryKey: ["question", question_id],
      })

      await revalidatePage("/question/u/[id]", "page")

      setTimeout(() => {
        replace(`/question/${question_id!}`)

        clearQuestionEditorState()
        clearSelectedTagList()
        clearTagSearch()
      }, 0)

      return
    }

    toast.error("질문 수정에 실패했습니다", {
      position: "bottom-center",
      toastId: "updateQuestionError",
    })
  }

  const onInvalid = async (errors: FieldErrors<AskQuestionFormData>) => {
    // title
    if (errors?.title) {
      const titleErrorMessage = ((type: typeof errors.title.type) => {
        switch (type) {
          case "required":
            return "제목을 입력해주세요"
          case "minLength":
            return `제목은 최소 ${Limitation.title_limit_under}자 이상 가능합니다`
          case "maxLength":
            return `제목은 최대 ${Limitation.question_title_limit_over}자까지 가능합니다`
        }
      })(errors.title.type)

      toast.error(titleErrorMessage, {
        position: "top-center",
        toastId: "questionTitleToast",
      })

      window.scroll({
        top: 0,
        behavior: "smooth",
      })

      setTimeout(() => {
        setFocus("title")
      }, 0)

      return
    }

    // content
    if (errors?.content) {
      const contentErrorMessage = ((type: typeof errors.content.type) => {
        switch (type) {
          case "required":
            return "본문을 입력해주세요"
          case "minLength":
            return `본문은 최소 ${Limitation.content_limit_under}자 이상 가능합니다`
          case "maxLength":
            return `본문은 최대 ${Limitation.question_content_limit_over}자까지 가능합니다`
        }
      })(errors.content.type)

      toast.error(contentErrorMessage, {
        position: "top-center",
        toastId: "questionContentToast",
      })

      setTimeout(() => {
        editorRef.current?.getInstance().focus()
      }, 0)

      return
    }
  }

  useEffect(() => {
    localStorage.removeItem(DELETE_IMAGE_LOCAL_STORAGE_KEY)
    clearTagSearch()

    const deleteImageLinkFromMarkdown = async (e: CustomEvent) => {
      const markdown = editorRef.current?.getInstance().getMarkdown() ?? ""

      const { targetLink } = e.detail as DeleteImageLinkFromMarkdownPayload

      const replacedMarkdown = replaceAllMarkdownImageLink(markdown, {
        targetLink,
        replaceValue: "",
      })

      if (replacedMarkdown !== null) {
        editorRef.current?.getInstance().setMarkdown(replacedMarkdown)
      }
    }

    window.addEventListener(
      deleteImageLinkFromMarkdownEventName as any,
      deleteImageLinkFromMarkdown,
    )

    return () => {
      window.removeEventListener(
        deleteImageLinkFromMarkdownEventName as any,
        deleteImageLinkFromMarkdown,
      )
    }
  }, []) /* eslint-disable-line */

  return (
    <>
      {!loaded && <Loading />}
      <form
        id="question-form"
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className={`transition-opacity duration-1000 ${
          !loaded ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* title section */}
        <AskQuestionSection className="border-transparent p-0">
          <Input
            id="title"
            spellCheck="false"
            autoComplete="off"
            fullWidth
            className="rounded-none border-r-0 border-l-0 border-t-0 text-3xl placeholder:text-3xl"
            placeholder="제목"
            {...register("title", {
              required: true,
              minLength: Limitation.title_limit_under,
              maxLength: Limitation.question_title_limit_over,
              disabled: !loaded,
              onChange(event) {
                updateQuestionEditorState({
                  title: event.currentTarget.value,
                })
              },
            })}
          />
        </AskQuestionSection>
        {/* skils section */}
        <Spacing size={20} />
        <AskQuestionSection>
          <div className="flex w-full align-top gap-1 max-w-full justify-center items-start flex-col md:flex-row md:justify-start md:items-center">
            <AskQuestionSection.Label className="block w-max">
              기술 스택
            </AskQuestionSection.Label>
            <SelectableTagList.SummarizedSelectedTagList
              uniqueKey={editMode}
              questionId={question_id}
              callback={selectCallback}
            />
          </div>
          <SelectableTagList
            searchable
            uniqueKey={editMode}
            questionId={question_id}
            tagList={techTagList}
            {...(initialValues?.skills && {
              initialSelectedTagList: [...initialValues.skills],
            })}
            maximumLength={MAXIMUM_SELECT_TAG_LENGTH}
            callback={selectCallback}
          />
        </AskQuestionSection>
        {/* content section */}
        <Spacing size={20} />
        <div className="hidden">
          <Input
            hidden
            id="content"
            className="sr-only"
            spellCheck="false"
            {...register("content", {
              required: true,
              minLength: Limitation.content_limit_under,
              maxLength: Limitation.question_content_limit_over,
            })}
          />
        </div>
        <AskQuestionSection>
          <AskQuestionSection.Label htmlFor="content">
            본문
          </AskQuestionSection.Label>
          <div className="relative">
            <ContentEditor
              ref={editorRef}
              {...(initialValues?.content && {
                initialValue: initialValues.content,
              })}
              action={editMode}
              initialUploadImages={initialValues?.uploadImages}
              autofocus={false}
              onLoad={() => {
                /*
                  - change 핸들러에서 cloneDeep하여 recoil로 설정할 경우 change마다 2초정도 걸리며 지연이 생기며 버벅임 
                  - recoil에서 useTransition을 잘 지원하는지 불분명함
                    
                  - 유지 보수 및 성능을 고려하여 현시점에서는 
                  customevent로 Control 컴포넌트에 ref를 전달하는 방법으로 구현 함
                */
                window.dispatchEvent(
                  new CustomEvent(sendEditorRefEventName, {
                    detail: {
                      ref: editorRef.current,
                    } as SendEditorRefPayload,
                  }),
                )

                if (initialValues) {
                  queueMicrotask(() => {
                    console.log("set initialValues", { initialValues })
                    updateQuestionEditorState({
                      title: initialValues.title,
                      content: initialValues.content,
                      skills: initialValues.skills ?? undefined,
                      fileUploadImageLinks: initialValues.uploadImages ?? [],
                    })
                  })
                }
              }}
              onChange={async () => {
                const markdown =
                  editorRef.current?.getInstance().getMarkdown() ?? ""

                setValue("content", markdown)

                updateQuestionEditorState({
                  content: markdown,
                })
              }}
              hooks={{
                addImageBlobHook: uploadImageHook,
              }}
            />
            {uploadImageStatus.isUploadingImage ? <UploadingIndicator /> : null}
          </div>
        </AskQuestionSection>
      </form>
    </>
  )
}

export default AskQuestionForm

function Loading() {
  return (
    <div className="fixed left-0 top-[calc(var(--height-header)+67px)] sm:top-[--height-header] w-full h-full bg-white/60 backdrop-blur-[1px] flex justify-center items-center box-border p-1">
      <h3 className="absolute w-full top-6 flex justify-center items-center">
        <span className="inline-flex align-top justify-center items-center w-max break-all text-sm box-border px-2 py-0.5 rounded-lg border border-colorsGray bg-colorsLightGray">
          질문작성 페이지
        </span>
        &nbsp;를 로딩하고 있어요
      </h3>
      <div className="h-full">
        <ListLoading
          style={{
            width: "calc(100% - 80px)",
            maxWidth: "400px",
            margin: "0 auto",
            opacity: "0.5",
          }}
        />
      </div>
    </div>
  )
}

function UploadingIndicator() {
  return (
    <div className="absolute w-full h-full left-0 top-0 flex justify-center items-center bg-white/50 z-[31]">
      이미지 업로드 중...
    </div>
  )
}
