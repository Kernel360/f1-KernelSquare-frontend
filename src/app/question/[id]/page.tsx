import { layoutMeta } from "@/constants/layoutMeta"
import QnADetail from "@/page/qna-detail/QnADetail"
import { Metadata } from "next"

interface QuestionDetailPageProps {
  params: {
    id: string
  }
}

function isValidPageProps({ params }: QuestionDetailPageProps) {
  const id = params.id

  if (Number(id) < 0 || params.id.includes(".") || Number.isNaN(Number(id))) {
    return false
  }

  return true
}

export async function generateMetadata({
  params,
}: QuestionDetailPageProps): Promise<Metadata> {
  if (!isValidPageProps({ params })) {
    return {
      title: `존재하지 않는 페이지`,
      description: `존재하지 않는 페이지에 대한 접근입니다.`,
    }
  }
  try {
    return {
      title: `개발자 Q&A 상세 페이지`,
      description: `개발자 Q&A 상세 페이지`,
    }
  } catch (error) {
    return {
      title: `잘못된 페이지 요청`,
      description: `잘못된 페이지 요청입니다. 올바른 형식의 페이지를 요청해주세요.`,
    }
  }
}

export default function QuestionDetailPage({
  params,
}: QuestionDetailPageProps) {
  return <QnADetail id={params.id} />
}
