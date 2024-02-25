import { Metadata } from "next"
import UpdateCodingMeetings from "@/page/coding-meetings/update/UpdatePage"

export interface UpdateCodingMeetingsPageProps {
  params: {
    token: string
  }
}

export const metadata: Metadata = {
  title: "모각코 수정",
  description: "모여서 각자 코딩 모임 수정",
}

export default function UpdateCodingMeetingsPage({
  params,
}: UpdateCodingMeetingsPageProps) {
  return (
    <div>
      <UpdateCodingMeetings token={params.token} />
    </div>
  )
}
