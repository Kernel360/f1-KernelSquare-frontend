import LinkToListPage from "@/components/LinkToListPage"
import Spacing from "@/components/shared/Spacing"
import AuthGuardModal from "@/components/shared/auth-modal"
import QuestionFormProvider from "@/page/askQuestion/QuestionFormProvider"
import QuestionControl from "@/page/askQuestion/components/form/QuestionControl"
import QuestionForm from "@/page/askQuestion/components/form/QuestionForm"
import ScrollTopButton from "@/components/shared/button/ScrollTopButton"
import { getServerSession } from "@/util/auth"
import { Metadata } from "next"

export const revalidate = 0

export const metadata: Metadata = {
  title: "질문 작성",
  description: "질문 작성 페이지",
  robots: {
    index: false,
  },
}

export default function AskQuestionPage() {
  const { user } = getServerSession()

  if (!user) {
    return <AuthGuardModal page="question" />
  }

  return (
    <QuestionFormProvider>
      <div className="px-6 py-6 sm:px-12 sm:py-2 pc:pl-[120px] pc:pr-[60px] xl:!pr-[120px] pc:pt-[72px] pc:pb-12">
        <div className="hidden pc:block">
          <LinkToListPage to="qna" />
        </div>
        <h3 className="my-6 sm:my-8 pc:my-12 font-bold text-2xl pc:text-[32px]">
          Q&A 작성하기
        </h3>
        <QuestionForm mode="create" />
        <Spacing size={132} />
        <QuestionControl mode="create" />
        <ScrollTopButton wrapperClassName={"bottom-[136px] lg:right-4"} />
      </div>
    </QuestionFormProvider>
  )
}
