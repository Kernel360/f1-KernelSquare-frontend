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
import { errorMessage } from "@/constants/message/error"
import dynamic from "next/dynamic"
import { TimeCount } from "@/recoil/atoms/coffee-chat/schedule"
import { useGetScheduleList } from "./hooks/useGetScheduleList"
import Limitation from "@/constants/limitation"
import { AxiosError } from "axios"
import { APIResponse } from "@/interfaces/dto/api-response"
import { twJoin } from "tailwind-merge"
import TextCounter from "@/components/shared/TextCounter"
import notificationMessage from "@/constants/message/notification"
import { validationMessage } from "@/constants/message/validation"

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

  const { register, handleSubmit, watch, setValue, getValues } =
    useForm<CoffeeChatFormData>(
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

  const { createCoffeeChatPost } = CoffeeChatQueries.useCreateCoffeeChatPost()

  const first: string[] = useGetScheduleList(0)
  const twice: string[] = useGetScheduleList(1)
  const third: string[] = useGetScheduleList(2)
  setTimeCount(first.concat(twice).concat(third).length)

  const onSubmit = async (data: CoffeeChatFormData) => {
    if (!user)
      return toast.error(notificationMessage.unauthorized, {
        toastId: "unauthorizedToCreateCoffeeChat",
        position: "top-center",
      })
    if (data.title.length < Limitation.title_limit_under)
      return toast.error(validationMessage.underTitleLimit, {
        toastId: "underCoffeeChatTitleLimit",
        position: "top-center",
      })
    if (data.title.length > Limitation.title_limit_over)
      return toast.error(validationMessage.overTitleLimit, {
        toastId: "overCoffeeChatTitleLimit",
        position: "top-center",
      })
    if (!editorRef.current?.getInstance().getMarkdown())
      return toast.error(validationMessage.noContent, {
        toastId: "emptyCoffeeChatContent",
        position: "top-center",
      })
    if (
      editorRef.current?.getInstance().getMarkdown().length <
      Limitation.content_limit_under
    )
      return toast.error(validationMessage.underContentLimit, {
        toastId: "underCoffeeChatContent",
        position: "top-center",
      })
    if (
      editorRef.current?.getInstance().getMarkdown().length >
      Limitation.content_limit_over
    )
      return toast.error(validationMessage.overContentLimit, {
        toastId: "overCoffeeChatContent",
        position: "top-center",
      })

    if (timeCount === 0)
      return toast.error(validationMessage.undertimeCntLimit, {
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
        onError: (error: Error | AxiosError<APIResponse>) => {
          if (error instanceof AxiosError) {
            const { response } = error as AxiosError<APIResponse>

            toast.error(response?.data.msg ?? errorMessage.createCoffeeChat, {
              toastId: "failToCreateCoffeeChat",
              position: "top-center",
            })
            return
          }
          toast.error(errorMessage.createCoffeeChat, {
            toastId: "failToCreateCoffeeChat",
            position: "top-center",
          })
        },
      },
    )
  }

  const onInvalid = async (errors: FieldErrors<CoffeeChatFormData>) => {
    if (errors.title?.type === "required") {
      toast.error(validationMessage.notitle, {
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

  const TitleInputClass = twJoin([
    "rounded-none border-r-0 border-l-0 border-t-0 text-3xl placeholder:text-3xl",
    watch("title") &&
      (watch("title")?.length < Limitation.title_limit_under ||
        watch("title")?.length > Limitation.title_limit_over) &&
      "focus:border-danger border-danger",
  ])

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
            className={TitleInputClass}
            placeholder="제목"
            {...register("title", {
              required: true,
              minLength: Limitation.title_limit_under,
              maxLength: Limitation.title_limit_over,
            })}
          />
          <div>
            {watch("title") &&
              (watch("title")?.length < Limitation.title_limit_under ||
                watch("title")?.length > Limitation.title_limit_over) && (
                <Input.ErrorMessage className="text-md">
                  {"제목은 5자 이상 100자 이하여야 합니다."}
                </Input.ErrorMessage>
              )}
          </div>
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
              onChange={() => {
                setValue(
                  "content",
                  editorRef.current?.getInstance().getMarkdown() ?? "",
                )
              }}
            />
            <TextCounterBox text={watch("content")} />
          </div>
        </CoffeeChatSection>
        <Spacing size={20} />
        <HashTagsSection />
        <Spacing size={20} />
        <ScheduleSection />
        <div className="flex justify-center">
          <Button
            disabled={
              !user ||
              timeCount === 0 ||
              !watch("content") ||
              watch("content").length < Limitation.content_limit_under ||
              watch("content").length > Limitation.content_limit_over ||
              !getValues("title") ||
              getValues("title").length < Limitation.title_limit_under ||
              getValues("title").length > Limitation.title_limit_over
            }
            buttonTheme="primary"
            className="p-5 py-3 my-10 disabled:bg-colorsGray disabled:text-colorsDarkGray"
            type="submit"
          >
            멘토링 개설하기
          </Button>
        </div>
        <input hidden className="hidden" {...register("content")} />
      </form>
    </div>
  )
}

export default CreateCoffeeChatReservationPage

type TextCounterBoxProps = {
  text: string | undefined
}

const TextCounterBox = ({ text }: TextCounterBoxProps) => {
  if (!text) return
  return (
    <TextCounter
      text={text ?? ""}
      min={Limitation.content_limit_under}
      max={Limitation.content_limit_over}
      className="text-lg block text-right h-2 mr-5"
    />
  )
}
