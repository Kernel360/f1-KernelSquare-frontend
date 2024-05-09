"use client"

import { useForm } from "react-hook-form"
import Spacing from "@/components/shared/Spacing"
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
import {
  CoffeeChatEditorInitialValues,
  CoffeeChatFormData,
} from "@/interfaces/form"
import TitleSection from "./components/sections/title/TitleSection"
import IntroductionSection from "./components/sections/introduction/IntroductionSection"
import ContentSection from "./components/sections/content/ContentSection"
import { pickError } from "./controls/util/form"
import { useCreateCoffeeChat } from "./hooks/useCreateCoffeeChat"
import LinkToListPage from "@/components/LinkToListPage"

export interface CoffeeChatFormProps {
  initialValues?: CoffeeChatEditorInitialValues
  post_id?: number
}

function CreateCoffeeChatReservationPage({
  initialValues,
  post_id,
}: CoffeeChatFormProps) {
  const { user } = useClientSession()

  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting },
  } = useForm<CoffeeChatFormData>(
    initialValues
      ? {
          defaultValues: {
            ...initialValues,
          },
        }
      : {},
  )

  const { createCoffeeChatApi, createCoffeeChatApiStatus } =
    useCreateCoffeeChat({
      memberId: user?.member_id ?? -1,
    })
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

    createCoffeeChatApi({
      ...payload,
    })
  }

  const onInvalid = (errors: FieldErrors<CoffeeChatFormData>) => {
    /*
      - 명시적으로 error 객체를 활용한 로직을 구현해도 되나, 
        submit 로직에 집중하도록 하기 위해 코드라인을 줄임
        (관리하고 있는 필드가 비교적 많아, 모두 타이핑시 코드 라인 많아짐)
      - 모든 필드 데이터를 리액트 훅 폼으로 관리하며, 
        각 필드(title, introduction...)에 대한 리액트 훅 폼 에러메시지를 설정했기 때문에,
        에러 객체의 message를 그대로 활용
    */
    const { type, message } = pickError(errors)

    toast.error(message, {
      toastId: `${type}-${message}`,
      position: "top-center",
    })
  }

  useEffect(() => {
    return () => {
      clear()
    }
  }, []) /* eslint-disable-line */

  return (
    <div className="px-6 py-6 sm:px-12 sm:py-2 pc:pl-[120px] pc:pr-[60px] pc:pt-[72px] pc:pb-12">
      <div className="hidden pc:block">
        <LinkToListPage to="chat" />
      </div>
      <h3 className="my-6 sm:my-8 pc:my-12 font-bold text-2xl pc:text-[32px]">
        커피챗 개설하기
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className={`transition-opacity animate-in fade-in-0 [animation-duration:1000ms]`}
      >
        <div className="flex flex-col w-full gap-y-6 mb-12 pc:mb-[72px] ">
          <TitleSection control={control} />
          <IntroductionSection control={control} />
          <ContentSection control={control} />
          <HashTagsSection control={control} />
          <ScheduleSection control={control} />
        </div>
        <div className="flex w-full pc:justify-end">
          <Button
            disabled={
              !isValid ||
              isSubmitting ||
              createCoffeeChatApiStatus === "pending"
            }
            buttonTheme="primary"
            className="w-full pc:w-fit p-5 py-3 my-10 disabled:bg-colorsGray disabled:text-colorsDarkGray"
            type="submit"
          >
            {createCoffeeChatApiStatus === "pending"
              ? "처리 중"
              : "커피챗 개설하기"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateCoffeeChatReservationPage
