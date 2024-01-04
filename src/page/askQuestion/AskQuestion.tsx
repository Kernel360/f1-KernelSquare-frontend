import dynamic from "next/dynamic"
import AskQuestionForm from "./components/AskQuestionForm"
import Spacing from "@/components/shared/Spacing"

const AskQuestionPageControl = dynamic(
  () => import("./components/AskQuestionPageControl"),
  {
    ssr: false,
  },
)

function AskQuestion() {
  return (
    <div className="flex flex-col lgDevice:flex-row">
      <div className="box-border px-4 flex-1 order-2 lgDevice:order-1 lgDevice:px-6">
        <Spacing size={32} />
        <AskQuestionForm />
        <Spacing size={120} />
      </div>
      <AskQuestionPageControl />
    </div>
  )
}

export default AskQuestion
