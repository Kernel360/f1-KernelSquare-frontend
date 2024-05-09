"use client"

import { useForm } from "react-hook-form"
import Spacing from "@/components/shared/Spacing"
import { useEffect, useRef } from "react"
import { Editor } from "@toast-ui/react-editor"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { useClientSession } from "@/hooks/useClientSession"
import type { FieldErrors } from "react-hook-form"
import Button from "@/components/shared/button/Button"
import { CoffeeChatFormProps } from "./CreateCoffeeChatReservationPage.types"
import CoffeeChatSection from "./components/CoffeeChatSection"
import HashTagsSection from "./components/sections/hashtag/HashTagsSection"
import ScheduleSection from "./components/ScheduleSection"
import { CoffeeChatQueries } from "@/react-query/coffee-chat"
import { errorMessage } from "@/constants/message/error"
import dynamic from "next/dynamic"
import Limitation from "@/constants/limitation"
import { AxiosError } from "axios"
import { APIResponse } from "@/interfaces/dto/api-response"
import TextCounter from "@/components/shared/TextCounter"
import notificationMessage from "@/constants/message/notification"
import { validationMessage } from "@/constants/message/validation"
import { useSelectedChatTimes } from "./hooks/useSelectedChatTimes"
import { CreateCoffeeChatPostRequest } from "@/interfaces/dto/coffee-chat/create-coffeechat-post.dto"
import { transformDateTime } from "./controls/util/parse-field"
import { CoffeeChatFormData } from "@/interfaces/form"
import { DateTimeRuleValidateType } from "./controls/rules/datetime-rules"
import TitleSection from "./components/sections/title/TitleSection"
import IntroductionSection from "./components/sections/introduction/IntroductionSection"
// import { EditMode } from "@/page/askQuestion/components/AskQuestionPageControl"

const MdEditor = dynamic(() => import("./components/MdEditor"), {
  ssr: false,
})

function CreateCoffeeChatReservationPage({
  initialValues,
  post_id,
}: CoffeeChatFormProps) {
  // 추후 커피챗 게시글 수정 기능 구현 시 사용 예정
  // const editMode: EditMode = initialValues && post_id ? "update" : "create"
  const queryClient = useQueryClient()
  const { replace } = useRouter()

  const { user } = useClientSession()

  const { register, handleSubmit, watch, setValue, control } =
    useForm<CoffeeChatFormData>(
      initialValues
        ? {
            defaultValues: {
              title: initialValues.title,
              content: initialValues.content,
              introduction: initialValues.introduction,
            },
          }
        : {},
    )

  const editorRef = useRef<Editor>(null)

  const { clear } = useSelectedChatTimes()

  const { createCoffeeChatPost } = CoffeeChatQueries.useCreateCoffeeChatPost()

  const onSubmit = async (data: CoffeeChatFormData) => {
    if (!user)
      return toast.error(notificationMessage.unauthorized, {
        toastId: "unauthorizedToCreateCoffeeChat",
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

    const payload: CreateCoffeeChatPostRequest = {
      member_id: user.member_id,
      title: data.title,
      introduction: data.introduction,
      content: editorRef.current?.getInstance().getMarkdown(),
      hash_tags: data.hashTags ?? [],
      date_times: transformDateTime(data.dateTimes!),
    }

    createCoffeeChatPost(
      {
        ...payload,
      },
      {
        onSuccess: (res) => {
          queryClient.invalidateQueries({
            queryKey: ["chat"],
          })

          replace(`/chat/${res.data.data?.reservation_article_id}`)
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
    if (errors.title) {
      const { type, message } = errors.title

      if (type === "required") {
        toast.error(message, {
          toastId: "emptyCoffeeChatTitle",
          position: "top-center",
        })

        return
      }

      if (type === "minLength" || type === "maxLength") {
        toast.error(message, {
          toastId: "coffeeChatTitleLength",
          position: "top-center",
        })

        return
      }
    }

    if (errors.introduction) {
      const { type, message } = errors.introduction

      if (type === "required") {
        toast.error(message, {
          toastId: "emptyChatIntroduction",
          position: "top-center",
        })

        return
      }

      if (type === "minLength" || type === "maxLength") {
        toast.error(message, {
          toastId: "ChatIntroductionLength",
          position: "top-center",
        })

        return
      }
    }

    if (errors.dateTimes) {
      const { type, message } = errors.dateTimes

      if (type === "required" || type === DateTimeRuleValidateType.Empty) {
        toast.error(message ?? validationMessage.undertimeCntLimit, {
          toastId: "emptyChatTime",
          position: "top-center",
        })

        return
      }

      if (type === DateTimeRuleValidateType.Maximum) {
        toast.error(message ?? validationMessage.overtimeCntLimit, {
          toastId: "maxLengthChatTimes",
          position: "top-center",
        })

        return
      }
    }
  }

  useEffect(() => {
    return () => {
      clear()
    }
  }, []) /* eslint-disable-line */

  if (!user) return

  const handleSubmitButtonDisabled = () => {
    const isValidContent = () =>
      !watch("content") ||
      watch("content").length < Limitation.content_limit_under ||
      watch("content").length > Limitation.content_limit_over

    return !user || isValidContent()
  }

  return (
    <div className="mt-5 px-6 tabletDevice:px-12 xl:px-16">
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className={`transition-opacity duration-1000 w-full`}
      >
        {/* title section */}
        <Spacing size={20} />
        <TitleSection control={control} />
        <Spacing size={20} />
        <IntroductionSection control={control} />
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
        <HashTagsSection control={control} />
        <Spacing size={20} />
        <ScheduleSection control={control} />
        <div className="flex justify-center">
          <Button
            disabled={handleSubmitButtonDisabled()}
            buttonTheme="primary"
            className="p-5 py-3 my-10 disabled:bg-colorsGray disabled:text-colorsDarkGray"
            type="submit"
          >
            커피챗 개설하기
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
