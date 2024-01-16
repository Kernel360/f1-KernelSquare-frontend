import Spacing from "@/components/shared/Spacing"
import AuthGuardModal from "@/components/shared/auth-modal"
import { isLogined } from "@/util/auth"
import { Metadata } from "next"
import dynamic from "next/dynamic"

export const revalidate = 0

export const metadata: Metadata = {
  title: "질문 작성",
  description: "질문 작성 페이지",
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

export default function AskQuestionPage() {
  if (!isLogined()) {
    return <AuthGuardModal page="question" />
  }

  return (
    <div className="flex flex-col lgDevice:flex-row">
      <div className="box-border px-4 flex-1 order-2 lgDevice:order-1 lgDevice:px-6">
        <Spacing size={32} />
        <AskQuestionForm />
        <Spacing size={120} />
      </div>
      <AskQuestionPageControl editMode={"create"} />
    </div>
  )
}
