import { Metadata } from "next"
import CodingMeetingsDetail from "@/page/coding-meetings/detail/DetailPage"

export interface CodingMeetingsDetailPageProps {
  params: {
    token: string
  }
}

export const metadata: Metadata = {
  title: "모각코 상세보기",
  description: "모여서 각자 코딩 상세보기",
}

export default function CodingMeetingsDetailPage({
  params,
}: CodingMeetingsDetailPageProps) {
  return (
    <div>
      <CodingMeetingsDetail token={params.token} />
    </div>
  )
}
