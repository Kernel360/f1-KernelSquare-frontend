"use client"

import ListLoading from "@/components/shared/animation/ListLoading"
import {
  QuestionFormData,
  QuestionPageMode,
} from "@/interfaces/form/question-form"
import { FieldErrors } from "react-hook-form"
import { useQuestionFormContext } from "../../hooks/useQuestionFormContext"
import QuestionTitleSection from "../fields/title/QuestionTitleSection"
import QuestionSkillSection from "../fields/skill/QuestionSkillSection"
import QuestionContentSection from "../fields/content/QuestionContentSection"
import {
  SubmitResultBase,
  onSubmitQuestion,
  onSubmitUpdateQuestion,
} from "@/util/actions/form"
import { useClientSession } from "@/hooks/useClientSession"
import {
  createMockQuestion,
  updateMockQuestion,
} from "@/mocks/util/mock-question"
import { createAIAutoAnswer } from "@/service/answers"
import { toast } from "react-toastify"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { HttpStatusCode } from "axios"
import { deleteImages } from "@/service/images"
import { revalidatePage } from "@/util/actions/revalidatePage"
import { QUESTION_QUERY_KEY } from "@/constants/queryKey"

interface QuestionFormProps {
  mode: QuestionPageMode
  questionId?: number
}

function QuestionForm({ mode, questionId }: QuestionFormProps) {
  const queryClient = useQueryClient()

  const { replace } = useRouter()

  const {
    handleSubmit,
    formState: { isLoading },
    formId,
    formReset,
  } = useQuestionFormContext()

  const { user } = useClientSession()
  const member_id = user?.member_id

  const onSubmit = async ({
    title,
    skills,
    content,
    images,
    imagesToDelete,
  }: QuestionFormData) => {
    const basePayload = {
      title,
      skills: skills.map(({ skill }) => skill),
      content,
      image_url: images.length ? images[0].uploadURL : "",
    }

    // create
    if (mode === "create") {
      const { success, createdQuestionId, error } = await onSubmitQuestion({
        ...basePayload,
        member_id: member_id ?? -1,
      })

      // create Success
      if (success) {
        if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
          createMockQuestion({
            ...basePayload,
            member_id: member_id!,
            question_id: createdQuestionId,
          })
        }

        if (createdQuestionId) {
          /* 
            catch 사용
            - AI 답변 생성의 성공, 실패가 영향을 주면 안 됨
            - 질문 상세페이지는 AI답변이 없어도 페이지 자체에 큰 영향을 미치는 에러가 아님
              (AI 답변만 없을 뿐임)
          */
          await createAIAutoAnswer({ questionId: createdQuestionId }).catch(
            (err) => console.log("AI 답변 error"),
          )
        }

        await queryClient.invalidateQueries({
          queryKey: QUESTION_QUERY_KEY.questionList,
        })

        replace(`/question/${createdQuestionId}`)
        formReset()

        /*
          - 최대한 토스트가 노출되고 사라지게 하기 위해
            지연시켜서 호출

          - 동기적으로 바로 toast를 호출할 경우
            replace로 인해 페이지 주소가 변경되면
            ToastDismiss 컴포넌트로 인해
            토스트가 바로 사라짐
        */
        setTimeout(() => {
          queueMicrotask(() => {
            toast.success("질문 생성에 성공했습니다", {
              position: "bottom-center",
            })
          })
        }, 400)

        return
      }

      // Error: create
      error && controlError({ error, mode })

      return
    }

    // update
    const { success, error } = await onSubmitUpdateQuestion({
      ...basePayload,
      questionId: questionId!,
    })

    // update Success
    if (success) {
      if (imagesToDelete?.length) {
        Promise.allSettled(
          imagesToDelete.map(({ uploadURL }) =>
            deleteImages({ imageUrl: uploadURL }),
          ),
        )
      }

      if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
        updateMockQuestion({
          ...basePayload,
          questionId: questionId!,
        })
      }

      queryClient.invalidateQueries({
        queryKey: QUESTION_QUERY_KEY.questionList,
      })

      queryClient.resetQueries({
        queryKey: QUESTION_QUERY_KEY.questionDetail(questionId!),
      })

      replace(`/question/${questionId}`)
      formReset()

      /*
        - 최대한 토스트가 노출되고 사라지게 하기 위해
          지연시켜서 호출

        - 동기적으로 바로 toast를 호출할 경우
          replace로 인해 페이지 주소가 변경되면
          ToastDismiss 컴포넌트로 인해
          토스트가 바로 사라짐
      */
      setTimeout(() => {
        /*
          - 수정 페이지 revalidate (캐시)
          - 수정 이후 기본 캐시 시간 이내 페이지 렌더링시
            캐시된 데이터를 사용함으로 인해,
            기대한 대로 동작하지 않을 수도 있어서 추가
            (서버환경에서 데이터를 받고, 이후 컴포넌트 렌더링)
        */
        revalidatePage("/question/u/[id]", "page")

        queueMicrotask(() => {
          toast.success("질문 수정에 성공했습니다", {
            position: "bottom-center",
          })
        })
      }, 400)

      return
    }

    // Error: update
    error && controlError({ error, mode })
  }

  const onInvalid = (errors: FieldErrors<QuestionFormData>) => {
    const { errorField, type, message } = pickFirstError(errors)!

    toast.error(message, {
      position: "top-center",
      toastId: `${errorField}-${type}`,
    })
  }

  if (isLoading)
    return (
      <div className="flex flex-col w-full items-center">
        <h3 className="w-full flex justify-center items-center">
          <span className="inline-flex align-top justify-center items-center w-max break-all text-sm box-border px-2 py-0.5 rounded-lg border border-colorsGray bg-colorsLightGray">
            {mode === "create" ? "질문 작성 페이지" : "질문 수정 페이지"}
          </span>
          &nbsp;를 로딩하고 있어요
        </h3>
        <div>
          <ListLoading
            style={{
              width: "calc(100% - 80px)",
              maxWidth: "300px",
              margin: "0 auto",
              opacity: "0.5",
            }}
          />
        </div>
      </div>
    )

  return (
    <form
      id={formId}
      className="animate-in fade-in-0 [animation-duration:1000ms] flex w-full flex-col gap-y-6 pc:gap-y-12"
      onSubmit={handleSubmit(onSubmit, onInvalid)}
    >
      <QuestionTitleSection />
      <QuestionSkillSection />
      <QuestionContentSection />
    </form>
  )
}

export default QuestionForm

const pickFirstError = (errors: FieldErrors<QuestionFormData>) => {
  const sortedKey: (keyof QuestionFormData)[] = [
    "title",
    "skills",
    "content",
    "images",
  ]

  for (const field of sortedKey) {
    const targetError = errors[field]

    if (targetError) return { ...targetError, errorField: field }
  }

  return null
}

const controlError = ({
  error,
  mode,
}: {
  error: NonNullable<SubmitResultBase["error"]>
  mode: QuestionPageMode
}) => {
  if (!!error?.api) {
    if (error.api.status === HttpStatusCode.Unauthorized) {
      revalidatePage(
        mode === "create" ? `/question` : `/question/u/[id]`,
        "page",
      ).then(() => {
        setTimeout(() => {
          toast.error("로그인 후 이용 가능합니다", { position: "top-center" })
        }, 400)
      })

      return
    }

    toast.error(error.api.message ?? "질문 생성에 실패했습니다", {
      position: "top-center",
      toastId: "questionApiError",
    })

    return
  }

  toast.error(error.app!.message ?? "질문 생성에 실패했습니다", {
    position: "top-center",
    toastId: "questionError",
  })
}
