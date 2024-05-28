import { lazy } from "react"
import QuestionSection from "../../QuestionSection"
import Spacing from "@/components/shared/Spacing"
import UploadImages from "./image/UploadImages"

const QuestionContentEditor = lazy(() => import("./QuestionContentEditor"))

function QuestionContentSection() {
  return (
    <QuestionSection>
      <QuestionSection.Label className="inline-flex align-top mb-4 sm:mb-[26px]">
        본문
      </QuestionSection.Label>
      <UploadImages />
      <Spacing size={16} />
      <QuestionContentEditor />
    </QuestionSection>
  )
}

export default QuestionContentSection
