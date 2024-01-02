import AskQuestionButton from "./components/AskQuestionButton"
import QuestionListContainer from "./components/QuestionListContainer"

function QnA() {
  return (
    <>
      <div className="flex">
        <QuestionListContainer />
        {/* 여백만 만들면 되지만, 추후 확장성을 고려하여 레이아웃으로 분리하여 배치 */}
        {/* side에 렌더링 되야 되는 요소가 있을 경우 수정예정 */}
        <aside className="bg-transparent min-h-screen hidden sm:block sm:w-32 lg:w-72" />
      </div>
    </>
  )
}

export default QnA
