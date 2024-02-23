"use client"

import { useForm } from "react-hook-form"
import { Input } from "@/components/shared/input/Input"
import Spacing from "@/components/shared/Spacing"
import { useRef } from "react"
import { Editor } from "@toast-ui/react-editor"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { useClientSession } from "@/hooks/useClientSession"
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
import { CoffeeChatQueries } from "@/react-query/coffee-chat"
import { useRecoilState } from "recoil"
import { HashTagList } from "@/recoil/atoms/coffee-chat/hashtags"
import { errorMessage } from "@/constants/message"
import dynamic from "next/dynamic"
import { TimeCount } from "@/recoil/atoms/coffee-chat/schedule"
import { useGetScheduleList } from "./hooks/useGetScheduleList"

const MdEditor = dynamic(() => import("./components/MdEditor"), {
  ssr: false,
})

function CreateCoffeeChatReservationPage({
  initialValues,
  post_id,
}: CoffeeChatFormProps) {
  // 추후 커피챗 게시글 수정 기능 구현 시 사용 예정
  const editMode: EditMode = initialValues && post_id ? "update" : "create"
  const [hash_tags, setHash_tags] = useRecoilState(HashTagList)
  const queryClient = useQueryClient()
  const { replace } = useRouter()
  const [timeCount, setTimeCount] = useRecoilState(TimeCount)

  const { user } = useClientSession()

  const { register, setFocus, handleSubmit } = useForm<CoffeeChatFormData>(
    initialValues
      ? {
          defaultValues: {
            title: initialValues.title,
          },
        }
      : {},
  )

  const editorRef = useRef<Editor>(null)

  const { createCoffeeChatPost } = CoffeeChatQueries.useCreateCoffeeChatPost()

  const first: string[] = useGetScheduleList(0)
  const twice: string[] = useGetScheduleList(1)
  const third: string[] = useGetScheduleList(2)
  setTimeCount(first.concat(twice).concat(third).length)

  const onSubmit = async (data: CoffeeChatFormData) => {
    if (!user)
      return toast.error(errorMessage.unauthorized, {
        toastId: "unauthorizedToCreateCoffeeChat",
        position: "top-center",
      })
    if (!data.title)
      return toast.error(errorMessage.notitle, {
        toastId: "emptyCoffeeChatTitle",
        position: "top-center",
      })
    if (!editorRef.current?.getInstance().getMarkdown())
      return toast.error(errorMessage.noContent, {
        toastId: "emptyCoffeeChatContent",
        position: "top-center",
      })
    if (timeCount === 0)
      return toast.error(errorMessage.undertimeCntLimit, {
        toastId: "emptyCoffeeChatTime",
        position: "top-center",
      })
    createCoffeeChatPost(
      {
        member_id: user.member_id,
        title: data.title,
        content: editorRef.current?.getInstance().getMarkdown(),
        hash_tags,
        date_times: first.concat(twice).concat(third),
      },
      {
        onSuccess: (res) => {
          queryClient.invalidateQueries({
            queryKey: ["chat"],
          })

          replace(`/chat/${res.data.data?.reservation_article_id}`)

          setHash_tags([])
        },
      },
    )
  }

  const onInvalid = async (errors: FieldErrors<CoffeeChatFormData>) => {
    if (errors.title?.type === "required") {
      toast.error(errorMessage.notitle, {
        toastId: "emptyCoffeeChatTitle",
        position: "top-center",
      })

      window.scroll({
        top: 0,
        behavior: "smooth",
      })

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
        <CoffeeChatSection>
          <CoffeeChatSection.Label htmlFor="content">
            소개글
          </CoffeeChatSection.Label>
          <div className="relative mt-3">
            <MdEditor
              previous=""
              editorRef={editorRef}
              userId={user?.member_id}
            />
          </div>
        </CoffeeChatSection>
        <Spacing size={20} />
        <HashTagsSection />
        <Spacing size={20} />
        <ScheduleSection />
        <div className="flex justify-center">
          <Button
            buttonTheme="primary"
            className="p-5 py-3 my-10"
            type="submit"
          >
            멘토링 개설하기
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateCoffeeChatReservationPage
