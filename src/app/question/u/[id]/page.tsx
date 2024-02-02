import Spacing from "@/components/shared/Spacing"
import AuthGuardModal from "@/components/shared/auth-modal"
import { layoutMeta } from "@/constants/layoutMeta"
import { ApiStatus } from "@/constants/response/api"
import { getQuestion } from "@/service/question"
import { getServerSession } from "@/util/auth"
import { AxiosError } from "axios"
import { Metadata } from "next"
import dynamic from "next/dynamic"
import { notFound } from "next/navigation"
import type { GetQuestionResponse } from "@/interfaces/dto/question/get-question.dto"

export interface QuestionUpdatePageProps {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: `${layoutMeta["updateQuestion"].title}`,
  description: `${layoutMeta["updateQuestion"].description}`,
}

function isValidPageProps({ params }: QuestionUpdatePageProps) {
  const id = params.id

  if (Number(id) < 0 || params.id.includes(".") || Number.isNaN(id)) {
    return false
  }

  return true
}

// dynamic import (CSR)
const AskQuestionForm = dynamic(
  () => import("@/page/askQuestion/components/AskQuestionForm"),
  {
    ssr: false,
  },
)

const AskQuestionPageControl = dynamic(
  () => import("@/page/askQuestion/components/AskQuestionPageControl"),
  {
    ssr: false,
  },
)

export default async function QuestionUpdatePage({
  params,
}: QuestionUpdatePageProps) {
  if (!isValidPageProps({ params })) {
    notFound()
  }

  const targetQuestionId = Number(params.id)

  const { user } = getServerSession()

  try {
    const { data: questionPayload } = await getQuestion({
      id: targetQuestionId,
    })

    if (!user) {
      return (
        <AuthGuardModal
          page="updateQuestion:Unauthorized"
          payload={{ questionId: targetQuestionId }}
        />
      )
    }

    if (questionPayload.data!.nickname !== user.nickname) {
      return (
        <AuthGuardModal
          page="updateQuestion:Forbidden"
          payload={{ questionId: targetQuestionId }}
        />
      )
    }

    return (
      <div className="flex flex-col lgDevice:flex-row">
        <div className="box-border px-4 flex-1 order-2 lgDevice:order-1 lgDevice:px-6">
          <Spacing size={32} />
          <AskQuestionForm
            editMode={"update"}
            initialValues={{
              title: questionPayload.data?.title || "",
              content: questionPayload.data?.content || "",
              ...(questionPayload.data?.skills?.length && {
                skills: [...questionPayload.data.skills],
              }),
              ...(questionPayload.data?.question_image_url && {
                uploadImages: [questionPayload.data.question_image_url],
              }),
            }}
            question_id={targetQuestionId}
          />
          <Spacing size={120} />
        </div>
        <AskQuestionPageControl
          editMode={"update"}
          questionId={targetQuestionId}
          {...(questionPayload.data?.question_image_url && {
            initialUploadImages: [questionPayload.data.question_image_url],
          })}
        />
      </div>
    )
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error as AxiosError<GetQuestionResponse>

      if (response) {
        const { code } = response.data

        if (code === ApiStatus.QnA.getQuestion.NotFound.Code) {
          return <>존재하지 않는 질문</>
        }
      }
    }

    notFound()
  }
}
