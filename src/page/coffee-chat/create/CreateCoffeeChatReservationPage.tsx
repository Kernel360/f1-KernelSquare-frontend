"use client"

import { useForm } from "react-hook-form"
import { Input } from "@/components/shared/input/Input"
import Spacing from "@/components/shared/Spacing"
import { useRef } from "react"
import { Editor } from "@toast-ui/react-editor"
import { toast } from "react-toastify"
import { techTagList } from "@/constants/editor"
import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { useClientSession } from "@/hooks/useClientSession"
import { useSelectTagList } from "@/hooks/useSelectTagList"
import type { FieldErrors } from "react-hook-form"
import ContentLoading from "@/components/shared/animation/ContentLoading"
import { EditMode } from "@/page/askQuestion/components/AskQuestionPageControl"
import Button from "@/components/shared/button/Button"
import {
  CoffeeChatFormData,
  CoffeeChatFormProps,
} from "./CreateCoffeeChatReservationPage.types"
import CoffeeChatSection from "./components/CoffeeChatSection"
import HashTagsSection from "./components/HashTagsSection"
import ScheduleSection from "./components/ScheduleSection"
import IntroductionSection from "./components/IntroductionSection"
import SkillsSection from "./components/SkillsSection"

function CreateCoffeeChatReservationPage({
  initialValues,
  post_id,
}: CoffeeChatFormProps) {
  const editMode: EditMode = initialValues && post_id ? "update" : "create"

  const { user } = useClientSession()

  const { register, setFocus, handleSubmit } = useForm<CoffeeChatFormData>(
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

  const onSubmit = async (data: CoffeeChatFormData) => {
    if (!user) return
  }

  const onInvalid = async (errors: FieldErrors<CoffeeChatFormData>) => {
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

  if (!user) return

  return (
    <div className="w-[80%] m-auto">
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
        <Spacing size={20} />
        <IntroductionSection />
        <Spacing size={20} />
        <HashTagsSection />
        <Spacing size={20} />
        <SkillsSection initialValues={initialValues} post_id={post_id} />
        <Spacing size={20} />
        <ScheduleSection />
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
