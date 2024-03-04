import ListPage from "@/components/shared/page-template/ListPage"
import QuestionListContainer from "./components/QuestionListContainer"
import ScrollTopButton from "../coding-meetings/main/ScrollTopButton"

function QnA() {
  return (
    <ListPage section="qna">
      <QuestionListContainer />
      <ScrollTopButton />
    </ListPage>
  )
}

export default QnA
