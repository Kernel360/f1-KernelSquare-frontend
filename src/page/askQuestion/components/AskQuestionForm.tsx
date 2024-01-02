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
import { techTagList } from "@/constants/editor"
import SelectableTagList from "@/components/shared/tag/SelectableTagList"
import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { createMockQuestion } from "@/mocks/handler/question"
import { useRecoilValue, useRecoilValueLoadable } from "recoil"
import { tagListState } from "@/recoil/atoms/tag"
import {
  questionEditorLoadedAtom,
  questionEditorState,
} from "@/recoil/atoms/questionEditor"
import {
  DeleteImageLinkFormMarkdownPayload,
  deleteImageLinkFromMarkdownEventName,
} from "./AskQuestionPageControl"
import { userAtom, userSelector } from "@/recoil/atoms/user"

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

function AskQuestionForm() {
  const { register, setValue, setFocus, handleSubmit } =
    useForm<AskQuestionFormData>()
  const editorRef = useRef<Editor>(null)

  const editorLoaded = useRecoilValue(questionEditorLoadedAtom)
  const {
    getQuestionEditorState,
    updateQuestionEditorState,
    resetQuestionEditorState,
    questionSubmit,
  } = useRecoilValue(questionEditorState)

  const { clearTagList } = useRecoilValue(tagListState)

  const user = useRecoilValue(userAtom)
  const userLoadable = useRecoilValueLoadable(userSelector)

  const queryClient = useQueryClient()
  const { replace } = useRouter()

  const onSubmit = async (data: AskQuestionFormData) => {
    const member_id = user!.id

    await updateQuestionEditorState({
      title: data.title,
      content: data.content,
    })

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
    const deleteImageLinkFormMarkdown = async (e: CustomEvent) => {
      const markdown = editorRef.current?.getInstance().getMarkdown() ?? ""

      const { targetLink } = e.detail as DeleteImageLinkFormMarkdownPayload

      const replacedMarkdown = markdown.replaceAll(
        new RegExp(`!\\[.*?\\]\\(${targetLink}\\)`, "gm"),
        "",
      )

      editorRef.current?.getInstance().setMarkdown(replacedMarkdown)
    }

    // const handleBeforeUnload = async (e: BeforeUnloadEvent) => {
    //   e.preventDefault()

    //   return false || (await clearQuestionEditorState())
    // }

    // window.addEventListener("beforeunload", handleBeforeUnload)

    window.addEventListener(
      deleteImageLinkFromMarkdownEventName as any,
      deleteImageLinkFormMarkdown,
    )

    return () => {
      resetQuestionEditorState()

      window.removeEventListener(
        deleteImageLinkFromMarkdownEventName as any,
        deleteImageLinkFormMarkdown,
      )
      // window.removeEventListener("beforeunload", handleBeforeUnload)
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
          <SelectableTagList searchable tagList={techTagList} />
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
