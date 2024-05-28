import Spacing from "@/components/shared/Spacing"
import AuthGuardModal from "@/components/shared/auth-modal"
import { layoutMeta } from "@/constants/layoutMeta"
import { ApiStatus } from "@/constants/response/api"
import { getQuestion } from "@/service/question"
import { getServerSession } from "@/util/auth"
import { AxiosError } from "axios"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import type { GetQuestionResponse } from "@/interfaces/dto/question/get-question.dto"
import QuestionFormProvider from "@/page/askQuestion/QuestionFormProvider"
import LinkToListPage from "@/components/LinkToListPage"
import QuestionForm from "@/page/askQuestion/components/form/QuestionForm"
import QuestionControl from "@/page/askQuestion/components/form/QuestionControl"
import ScrollTopButton from "@/components/shared/button/ScrollTopButton"

export interface QuestionUpdatePageProps {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: `${layoutMeta["updateQuestion"].title}`,
  description: `${layoutMeta["updateQuestion"].description}`,
  robots: {
    index: false,
  },
}

function isValidPageProps({ params }: QuestionUpdatePageProps) {
  const id = params.id

  if (Number(id) < 0 || params.id.includes(".") || Number.isNaN(id)) {
    return false
  }

  return true
}

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
      <QuestionFormProvider>
        <div className="px-6 py-6 sm:px-12 sm:py-2 pc:pl-[120px] pc:pr-[60px] xl:!pr-[120px] pc:pt-[72px] pc:pb-12">
          <div className="hidden pc:block">
            <LinkToListPage to="qna" />
          </div>
          <h3 className="my-6 sm:my-8 pc:my-12 font-bold text-2xl pc:text-[32px]">
            Q&A 수정하기
          </h3>
          <QuestionForm mode="update" questionId={targetQuestionId} />
          <Spacing size={132} />
          <QuestionControl mode="update" questionId={targetQuestionId} />
          <ScrollTopButton wrapperClassName={"bottom-[136px] lg:right-4"} />
        </div>
      </QuestionFormProvider>
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
