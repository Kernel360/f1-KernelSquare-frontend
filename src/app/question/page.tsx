import AuthGuardModal from "@/components/shared/auth-modal/AuthGuardModal"
import AskQuestion from "@/page/askQuestion/AskQuestion"
import { isLogined } from "@/util/auth"
import { Metadata } from "next"

export const revalidate = 0

export const metadata: Metadata = {
  title: "질문 작성",
  description: "질문 작성 페이지",
}

export default function AskQuestionPage() {
  if (!isLogined()) {
    return <AuthGuardModal page="question" />
  }

  return <AskQuestion />
}
