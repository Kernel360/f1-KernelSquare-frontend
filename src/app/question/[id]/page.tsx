import { layoutMeta } from "@/constants/layoutMeta"
import QnADetail from "@/page/qna-detail/QnADetail"
import { Metadata } from "next"

interface QuestionDetailPage {
  params: {
    id: string
  }
}

/*
  [TODO]
  generateMetadata로 각 질문글에 해당하는
  동적 metadata 생성
*/
export const metadata: Metadata = {
  title: `${layoutMeta["question"].title}`,
  description: `${layoutMeta["question"].description}`,
}

export default function QuestionDetailPage({ params }: QuestionDetailPage) {
  return <QnADetail id={params.id} />
}
