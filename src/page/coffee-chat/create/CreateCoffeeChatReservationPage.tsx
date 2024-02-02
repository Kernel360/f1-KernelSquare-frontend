"use client"

import { useForm } from "react-hook-form"
import { Input } from "@/components/shared/input/Input"
import Spacing from "@/components/shared/Spacing"
import {
  LabelHTMLAttributes,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { Editor } from "@toast-ui/react-editor"
import { toast } from "react-toastify"
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
import ContentLoading from "@/components/shared/animation/ContentLoading"
import { twJoin, twMerge } from "tailwind-merge"
import {
  DeleteImageLinkFromMarkdownPayload,
  EditMode,
  SendEditorRefPayload,
  deleteImageLinkFromMarkdownEventName,
  sendEditorRefEventName,
} from "@/page/askQuestion/components/AskQuestionPageControl"
import ContentEditor from "@/page/askQuestion/components/editor/ContentEditor"
import CustomCalendar from "../detail/reservation/CustomCalendar/CustomCalendar"
import { Value } from "../detail/reservation/CustomCalendar/Calendar.types"
import dayjs from "dayjs"
import Button from "@/components/shared/button/Button"
import { getDate, getTime } from "@/util/getDate"
import { AM, PM } from "@/constants/timeOptions"
import dynamic from "next/dynamic"
import Tag from "@/components/shared/tag/Tag"

const MdEditor = dynamic(() => import("./components/MdEditor"), {
  ssr: false,
})

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

function CreateCoffeeChatReservationPage({
  initialValues,
  question_id,
}: AskQustionFormProps) {
  const editMode: EditMode = initialValues && question_id ? "update" : "create"
  const [date, setDate] = useState<Value>(new Date())

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

  const { clearSelectedTagList } = useSelectTagList({
    uniqueKey: editMode,
    initialTagList: techTagList,
    initialSelectedTagList: initialValues?.skills?.length
      ? initialValues.skills
      : undefined,
  })

  const queryClient = useQueryClient()
  const { replace } = useRouter()

  const onSubmit = async (data: AskQuestionFormData) => {
    if (!user) return
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
    localStorage.removeItem(DELETE_IMAGE_LOCAL_STORAGE_KEY)

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

  if (!user) return

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className={`transition-opacity duration-1000 m-auto`}
      >
        {/* title section */}
        <CoffeeChatSection className="border-transparent p-0">
          <Input
            id="title"
            spellCheck="false"
            autoComplete="off"
            fullWidth
            className="rounded-none border-r-0 border-l-0 border-t-0 text-3xl placeholder:text-3xl"
            placeholder="제목"
            {...register("title", {
              required: true,
            })}
          />
        </CoffeeChatSection>
        {/* introduction section */}
        <Spacing size={20} />
        <CoffeeChatSection>
          <CoffeeChatSection.Label htmlFor="content">
            소개글
          </CoffeeChatSection.Label>
          <div className="relative">
            <MdEditor
              previous=""
              editorRef={editorRef}
              userId={user?.member_id}
            />
          </div>
        </CoffeeChatSection>
        {/* hashtags section */}
        <Spacing size={20} />
        <CoffeeChatSection className="border-transparent p-0">
          <Input
            id="hashtags"
            spellCheck="false"
            autoComplete="off"
            fullWidth
            className="rounded-none border-r-0 border-l-0 border-t-0 text-3xl placeholder:text-3xl"
            placeholder="해시태그"
            {...register("title", {
              required: true,
            })}
          />
        </CoffeeChatSection>
        {/* skils section */}
        <Spacing size={20} />
        <CoffeeChatSection>
          <div className="flex w-full align-top gap-1 max-w-full justify-center items-start flex-col md:flex-row md:justify-start md:items-center">
            <CoffeeChatSection.Label className="block w-max">
              기술 스택
            </CoffeeChatSection.Label>
            <SelectableTagList.SummarizedSelectedTagList
              uniqueKey={editMode}
              initialTagList={techTagList}
              {...(initialValues?.skills && {
                initialSelectedTagList: [...initialValues.skills],
              })}
            />
          </div>
          <SelectableTagList
            searchable
            uniqueKey={editMode}
            tagList={techTagList}
            {...(initialValues?.skills && {
              initialSelectedTagList: [...initialValues.skills],
            })}
            maximumLength={MAXIMUM_SELECT_TAG_LENGTH}
          />
        </CoffeeChatSection>
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
            })}
          />
        </div>
        {/* schedule section */}
        <Spacing size={20} />
        <CoffeeChatSection>
          <div className="w-full align-top max-w-full flex-col md:flex-row md:justify-start md:items-center">
            <CoffeeChatSection.Label className="block w-max">
              멘토링 가능 일시
            </CoffeeChatSection.Label>
            <CustomCalendar
              start={dayjs().format()}
              date={date}
              limit={29}
              setDate={setDate}
            />
            <div className="my-10 text-xl text-secondary font-bold text-center">
              {getDate({ date: date + "" })}
            </div>
            <div className="flex justify-around">
              <div>
                <div className="font-bold text-primary text-lg mb-5">오전</div>
                <TimeOptions date={AM} />
              </div>
              <div>
                <div className="font-bold text-primary text-lg mb-5">오후</div>
                <TimeOptions date={PM} />
              </div>
            </div>
          </div>
        </CoffeeChatSection>
        <div className="flex justify-center">
          <Button buttonTheme="primary" className="p-5 py-3 my-10">
            멘토링 개설하기
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateCoffeeChatReservationPage

function Loading() {
  return (
    <div className="fixed left-0 top-[calc(var(--height-header)+67px)] sm:top-[--height-header] w-full h-full bg-white/60 backdrop-blur-[1px] flex justify-center items-center box-border p-1">
      <h3 className="absolute w-full top-6 flex justify-center items-center">
        <span className="inline-flex align-top justify-center items-center w-max break-all text-sm box-border px-2 py-0.5 rounded-lg border border-colorsGray bg-colorsLightGray">
          커피챗 상세 페이지
        </span>
        &nbsp;를 로딩하고 있어요
      </h3>
      <div className="h-full">
        <ContentLoading
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

interface CoffeeChatSectionProps extends NonNullable<PropsWithChildren> {
  className?: string
}

interface CoffeeChatSectionLabelProps
  extends LabelHTMLAttributes<HTMLLabelElement> {}

function CoffeeChatSection({ children, className }: CoffeeChatSectionProps) {
  const classNames = twMerge([
    "p-6 bg-white border border-colorsGray rounded-md",
    className,
  ])

  return <section className={classNames}>{children}</section>
}

CoffeeChatSection.Label = function CoffeeChatSectionLabel({
  className,
  children,
  ...props
}: CoffeeChatSectionLabelProps) {
  const classNames = twMerge([
    className,
    "text-colorsDarkGray text-lg font-bold",
  ])

  return (
    <div>
      <label className={classNames} {...props}>
        {children}
      </label>
    </div>
  )
}

type TimeOptionsProps = { date: string[] }

function TimeOptions({ date }: TimeOptionsProps) {
  const possibleTimes = []
  const handleRegister = (time: string) => {
    possibleTimes.push(time)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-rows-4 sm:grid-cols-3 gap-4 shrink-0">
      {date.map((date, i) => (
        <Tag
          className={
            "flex border-[1px] border-slate-200 px-6 py-2 rounded justify-center bg-white"
          }
          key={date + i}
          onClick={() => handleRegister(date)}
          onSelect={() => console.log("date", date)}
        >
          <div>{date}</div>
        </Tag>
      ))}
    </div>
  )
}
