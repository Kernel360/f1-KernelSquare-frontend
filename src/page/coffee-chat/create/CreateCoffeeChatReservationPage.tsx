"use client"

import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { useClientSession } from "@/hooks/useClientSession"
import type { FieldErrors } from "react-hook-form"
import Button from "@/components/shared/button/Button"
import HashTagsSection from "./components/sections/hashtag/HashTagsSection"
import ScheduleSection from "./components/ScheduleSection"
import notificationMessage from "@/constants/message/notification"
import { useSelectedChatTimes } from "./hooks/useSelectedChatTimes"
import { CreateCoffeeChatPostRequest } from "@/interfaces/dto/coffee-chat/create-coffeechat-post.dto"
import { transformDateTime } from "./controls/util/parse-field"
import TitleSection from "./components/sections/title/TitleSection"
import IntroductionSection from "./components/sections/introduction/IntroductionSection"
import ContentSection from "./components/sections/content/ContentSection"
import { useCreateCoffeeChat } from "./hooks/useCreateCoffeeChat"
import LinkToListPage from "@/components/LinkToListPage"
import { pickFirstError } from "@/util/hook-form/error"
import {
  CoffeeChatFormData,
  CoffeeChatPageMode,
  InitialCoffeeChat,
} from "@/interfaces/form/coffee-chat-form"
import {
  UpdateCoffeeChatVariables,
  useUpdateCoffeeChat,
} from "./hooks/useUpdateCoffeeChat"
import {
  createChangeDateTimesPayload,
  createChangeHashTagsPayload,
  payloadToFormData,
} from "../utill/parser"
import { INITIAL_COFFEE_CHAT_INTRODUCTION } from "@/constants/form/coffee-chat-form"
import { useRouter } from "next/navigation"
import { revalidatePage } from "@/util/actions/revalidatePage"
import { AxiosError, HttpStatusCode } from "axios"
import { APIResponse } from "@/interfaces/dto/api-response"
import { useResetRecoilState } from "recoil"
import { ReservationSelectedDateAtom } from "@/recoil/atoms/coffee-chat/date"

export interface CoffeeChatFormProps {
  editMode: CoffeeChatPageMode
  post_id?: number
  initialCoffeeChat?: InitialCoffeeChat
}

function CreateCoffeeChatReservationPage(props: {
  editMode: "create"
}): JSX.Element
function CreateCoffeeChatReservationPage(props: {
  editMode: "update"
  post_id: number
  initialCoffeeChat: InitialCoffeeChat
}): JSX.Element
function CreateCoffeeChatReservationPage({
  editMode,
  post_id,
  initialCoffeeChat,
}: CoffeeChatFormProps) {
  const { user, clientSessionReset } = useClientSession()

  const { replace } = useRouter()

  const formDefaultValues: CoffeeChatFormData =
    payloadToFormData(initialCoffeeChat)

  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting },
  } = useForm<CoffeeChatFormData>({
    defaultValues: {
      ...formDefaultValues,
    },
  })

  const { createCoffeeChatApi, createCoffeeChatApiStatus } =
    useCreateCoffeeChat()

  const { updateCoffeeChatApi, updateCoffeeChatApiStatus } =
    useUpdateCoffeeChat({
      articleId: post_id ?? -1,
      async onSuccess(data, variables, context) {
        await revalidatePage("/chat/[id]", "page")

        setTimeout(() => {
          replace(`/chat/${post_id}`)
        }, 0)
      },
      onError(error, variables, context) {
        if (error instanceof AxiosError) {
          const { response } = error as AxiosError<APIResponse>

          if (response?.status === HttpStatusCode.Unauthorized) {
            clientSessionReset()

            setTimeout(() => {
              toast.error("로그인이 필요합니다", {
                position: "top-center",
              })
            }, 0)

            return
          }

          toast.error(
            response?.data.msg ?? "커피챗 수정 중 에러가 발생했습니다",
            {
              position: "top-center",
            },
          )

          return
        }

        toast.error("커피챗 수정 중 에러가 발생했습니다", {
          position: "top-center",
        })
      },
    })

  const resetSelectedDay = useResetRecoilState(ReservationSelectedDateAtom)
  const { clear } = useSelectedChatTimes()

  const onSubmit = async ({
    title,
    introduction,
    content,
    hashTags,
    dateTimes,
  }: CoffeeChatFormData) => {
    if (!user)
      return toast.error(notificationMessage.unauthorized, {
        toastId: "unauthorizedToCreateCoffeeChat",
        position: "top-center",
      })

    const payload: CreateCoffeeChatPostRequest = {
      member_id: user.member_id,
      title,
      introduction,
      content,
      hash_tags: hashTags ?? [],
      date_times: transformDateTime(dateTimes ?? []),
    }

    if (editMode === "create") {
      createCoffeeChatApi({
        ...payload,
      })

      return
    }

    const updateHashTagsPayload = createChangeHashTagsPayload({
      initialHashTags: initialCoffeeChat?.hashtags ?? [],
      hashTagsPayload: hashTags,
    })

    const updateDateTimesPayload = createChangeDateTimesPayload({
      initialDateTimes: initialCoffeeChat?.date_times ?? [],
      dateTimesPayload: dateTimes,
    })

    const updatePayload: UpdateCoffeeChatVariables = {
      title,
      introduction: introduction ?? INITIAL_COFFEE_CHAT_INTRODUCTION,
      content,
      ...(updateHashTagsPayload && { change_hashtags: updateHashTagsPayload }),
      ...(updateDateTimesPayload && {
        change_reservations: updateDateTimesPayload,
      }),
    }

    updateCoffeeChatApi({ ...updatePayload })
  }

  const onInvalid = (errors: FieldErrors<CoffeeChatFormData>) => {
    const { type, message } = pickFirstError<CoffeeChatFormData>(errors)

    toast.error(message, {
      toastId: `${type}-${message}`,
      position: "top-center",
    })
  }

  useEffect(() => {
    return () => {
      resetSelectedDay()
      clear()
    }
  }, []) /* eslint-disable-line */

  return (
    <div className="px-6 py-6 sm:px-12 sm:py-2 pc:pl-[120px] pc:pr-[60px] pc:pt-[72px] pc:pb-12">
      <div className="hidden pc:block">
        <LinkToListPage to="chat" />
      </div>
      <h3 className="my-6 sm:my-8 pc:my-12 font-bold text-2xl pc:text-[32px]">
        {editMode === "create" ? "커피챗 개설하기" : "커피챗 수정하기"}
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className={`transition-opacity animate-in fade-in-0 [animation-duration:1000ms]`}
      >
        <div className="flex flex-col w-full gap-y-6 mb-12 pc:mb-[72px] ">
          <TitleSection control={control} />
          <IntroductionSection control={control} />
          <ContentSection
            initialContent={initialCoffeeChat?.content}
            control={control}
          />
          <HashTagsSection control={control} />
          <ScheduleSection
            control={control}
            initialDateTime={
              initialCoffeeChat?.date_times?.map(
                (dateTime) => dateTime.start_time,
              ) ?? []
            }
          />
        </div>
        <div className="flex w-full pc:justify-end">
          <Button
            disabled={
              !isValid ||
              isSubmitting ||
              createCoffeeChatApiStatus === "pending" ||
              updateCoffeeChatApiStatus === "pending"
            }
            buttonTheme="primary"
            className="w-full pc:w-fit p-5 py-3 my-10 disabled:bg-colorsGray disabled:text-colorsDarkGray"
            type="submit"
            onClick={(e) => {
              if (e.detail === 0) e.preventDefault()
            }}
          >
            {getSubmitButtonText({
              editMode,
              isPending:
                isSubmitting ||
                createCoffeeChatApiStatus === "pending" ||
                updateCoffeeChatApiStatus === "pending",
            })}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateCoffeeChatReservationPage

const getSubmitButtonText = ({
  editMode,
  isPending,
}: {
  editMode: CoffeeChatPageMode
  isPending: boolean
}) => {
  if (editMode === "create") {
    return isPending ? "커피챗 개설 중..." : "커피챗 개설하기"
  }

  return isPending ? "커피챗 수정 중..." : "커피챗 수정하기"
}
