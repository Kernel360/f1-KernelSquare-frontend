"use client"

import { useForm, FieldErrors } from "react-hook-form"
import AskQuestionSection from "./AskQuestionSection"
import { Input } from "@/components/shared/input/Input"
import Spacing from "@/components/shared/Spacing"
import ContentEditor from "./editor/ContentEditor"
import { useEffect, useRef } from "react"
import { Editor } from "@toast-ui/react-editor"
import { toast } from "react-toastify"
import ListLoading from "@/components/shared/animation/ListLoading"
import { TechTag } from "@/interfaces/tech-tag"
import { MAXIMUM_SELECT_TAG_LENGTH, techTagList } from "@/constants/editor"
import SelectableTagList from "@/components/shared/tag/SelectableTagList"
import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import {
  createMockQuestion,
  updateMockQuestion,
} from "@/mocks/handler/question"
import { useRecoilValue } from "recoil"
import { tagListState } from "@/recoil/atoms/tag"
import {
  questionEditorLoadedAtom,
  questionEditorState,
} from "@/recoil/atoms/questionEditor"
import {
  DeleteImageLinkFromMarkdownPayload,
  EditMode,
  deleteImageLinkFromMarkdownEventName,
} from "./AskQuestionPageControl"
import { useClientSession } from "@/hooks/useClientSession"
import { revalidatePage } from "@/util/actions/revalidatePage"
import { replaceAllMarkdownImageLink } from "@/util/editor"
import { useDeleteImage } from "@/hooks/image/useDeleteImage"

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
  initialValues?: QuestionEditorInitialValues
  question_id?: number
}

function AskQuestionForm({ initialValues, question_id }: AskQustionFormProps) {
  const editMode: EditMode = initialValues ? "update" : "create"

  const { user } = useClientSession()

  const { register, setValue, setFocus, handleSubmit } =
    useForm<AskQuestionFormData>({
      defaultValues: {
        ...(initialValues?.title && { title: initialValues.title }),
        ...(initialValues?.content && { content: initialValues.content }),
      },
    })
  const editorRef = useRef<Editor>(null)

  const editorLoaded = useRecoilValue(questionEditorLoadedAtom)
  // const cancelByUser = useRecoilValue(questionEditCancelByUserAtom)
  const {
    getQuestionEditCancelByUser,
    setQustionEditCancelByUser,
    getQuestionEditorState,
    updateQuestionEditorState,
    resetQuestionEditorState,
    questionSubmit,
    updateQuestionSubmit,
  } = useRecoilValue(questionEditorState)

  const { clearTagList } = useRecoilValue(tagListState)

  const queryClient = useQueryClient()
  const { replace } = useRouter()

  const { deleteImage } = useDeleteImage()

  const onSubmit = async (data: AskQuestionFormData) => {
    const member_id = user!.member_id

    await updateQuestionEditorState({
      title: data.title,
      content: data.content,
    })

    // create
    if (editMode === "create") {
      const { success, createdQuestionId } = await questionSubmit(member_id)

      if (success) {
        const questionStateSnapshot = await getQuestionEditorState()

        toast.success("질문 생성에 성공했습니다", { position: "bottom-center" })

        process.env.NEXT_PUBLIC_API_MOCKING === "enabled" &&
          createMockQuestion({
            member_id,
            title: questionStateSnapshot.title,
            content: questionStateSnapshot.content,
            image_url: questionStateSnapshot.fileUploadImageLinks[0] ?? "",
            skills: questionStateSnapshot.skills,
          })

        queryClient.invalidateQueries({
          queryKey: ["question", "list"],
        })

        setTimeout(() => {
          replace(`/question/${createdQuestionId!}`)
          clearTagList()
        }, 0)

        return
      }

      toast.error("질문 생성에 실패했습니다", { position: "bottom-center" })

      return
    }

    // update
    const { success } = await updateQuestionSubmit(question_id!)

    if (success) {
      const questionStateSnapshot = await getQuestionEditorState()

      const uploadFileResult = questionStateSnapshot.fileUploadImageLinks

      toast.success("질문 수정에 성공했습니다", { position: "bottom-center" })

      // 질문 수정 성공시 초기 업로드 이미지가 사용되지 않으면
      // 이미지 삭제 api 요청
      if (initialValues?.uploadImages?.length) {
        const removeImages = initialValues.uploadImages.filter(
          (uploadedImageUrl) => !uploadFileResult.includes(uploadedImageUrl),
        )

        if (removeImages?.length) {
          await Promise.allSettled([
            ...removeImages.map((imageUrl) => deleteImage(imageUrl)),
          ])
        }
      }

      if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
        updateMockQuestion({
          questionId: question_id!,
          title: questionStateSnapshot.title,
          content: questionStateSnapshot.content,
          image_url: questionStateSnapshot.fileUploadImageLinks[0] ?? "",
          skills: questionStateSnapshot.skills,
        })
      }

      queryClient.invalidateQueries({
        queryKey: ["question", "list"],
      })

      setTimeout(() => {
        replace(`/question/${question_id!}`)
        clearTagList()
      }, 0)

      return
    }

    toast.error("질문 수정에 실패했습니다", { position: "bottom-center" })
  }

  const onInvalid = async (errors: FieldErrors<AskQuestionFormData>) => {
    if (errors.title?.type === "required") {
      toast.error("제목을 입력해주세요", { position: "top-center" })

      window.scroll({
        top: 0,
        behavior: "smooth",
      })

      setTimeout(() => {
        setFocus("title")
      }, 0)

      return
    }

    if (errors.content?.type === "required") {
      toast.error("질문을 입력해주세요", { position: "top-center" })

      setTimeout(() => {
        editorRef.current?.getInstance().focus()
      }, 0)

      return
    }
  }

  useEffect(() => {
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
      /*
        - 중복되어 초기화 되지 않도록 하기 위해 cancelByUser atom으로 관리

        - 뒤로 가기, 새로고침 (cancelByUser === false)
          - 질문 작성(create)
            - 자동 저장등의 기능이 있는 것이 아니기 때문에,
              이미지와 콘텐츠를 보존할 필요가 없음
            - 업로드 파일에는 있으나 실제 마크다운 콘텐츠 구문에서
              사용하지 않는 이미지 삭제 api 요청
              => 이후, 업로드 파일에 있는 이미지 삭제 api 요청
              => 클라이언트 상태(recoil) 초기화
          - 질문 수정(update)
            - 자동 저장등의 기능이 없더라도, 
              취소하거나 언마운트(새로고침, 뒤로가기)때에는
              이전의 이미지와 콘텐츠가 보존되어야 한다
            - 수정 버튼을 통해 api가 성공한 경우의 
              업로드 이미지 관리는 submit 함수에서 하고 있기 때문에
              클라이언트 상태(recoil)만 초기화
      */
      getQuestionEditCancelByUser().then((cancelByUser) => {
        if (!cancelByUser) {
          resetQuestionEditorState(editMode).then(() => {
            window.removeEventListener(
              deleteImageLinkFromMarkdownEventName as any,
              deleteImageLinkFromMarkdown,
            )

            revalidatePage("/question")
            if (question_id) {
              revalidatePage("/question/u/[id]", "page")
            }
          })

          return
        }

        setQustionEditCancelByUser(false)
      })
    }
  }, []) /* eslint-disable-line */

  return (
    <>
      {!editorLoaded && <Loading />}
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className={`transition-opacity duration-1000 ${
          !editorLoaded ? "opacity-0" : "opacity-100"
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
              disabled: !editorLoaded,
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
            <SelectableTagList.SummarizedSelectedTagList />
          </div>
          <SelectableTagList
            searchable
            tagList={techTagList}
            {...(initialValues?.skills && {
              initialSelectedTagList: [...initialValues.skills],
            })}
            maximumLength={MAXIMUM_SELECT_TAG_LENGTH}
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
            {...register("content", { required: true })}
          />
        </div>
        <AskQuestionSection>
          <AskQuestionSection.Label htmlFor="content">
            본문
          </AskQuestionSection.Label>
          <ContentEditor
            ref={editorRef}
            {...(initialValues?.content && {
              initialValue: initialValues.content,
            })}
            action={question_id ? "update" : "create"}
            initialUploadImages={initialValues?.uploadImages}
            autofocus={false}
            onChange={() => {
              const markdown =
                editorRef.current?.getInstance().getMarkdown() ?? ""

              setValue("content", markdown)

              updateQuestionEditorState({
                content: markdown,
              })
            }}
          />
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
