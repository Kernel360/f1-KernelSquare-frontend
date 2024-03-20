import QnADetail from "@/page/qna-detail/QnADetail"
import { getQuestion } from "@/service/question"
import { extractTextFromMarkdown } from "@/util/markdown"
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

  const id = Number(params.id)

  try {
    const res = await getQuestion({ id })
    if (!res.data.data)
      return {
        title: `잘못된 Q&A 페이지 요청`,
        description: `잘못된 Q&A 페이지 요청입니다. 올바른 형식의 페이지를 요청해주세요.`,
      }

    const { title, nickname, content } = res.data.data
    const extractedContent = extractTextFromMarkdown(content)
    console.log("qna", title, nickname, extractedContent)

    return {
      title: `${title} (개발자 Q&A 상세 페이지)`,
      description: `${extractedContent ?? `${nickname}의 게시글입니다.`}`,
    }
  } catch (error) {
    return {
      title: `잘못된 Q&A 페이지 요청`,
      description: `잘못된 Q&A 페이지 요청입니다. 올바른 형식의 페이지를 요청해주세요.`,
    }
  }
}

export default function QuestionDetailPage({
  params,
}: QuestionDetailPageProps) {
  return <QnADetail id={params.id} />
}
