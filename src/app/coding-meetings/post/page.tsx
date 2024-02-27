import { Metadata } from "next"
import CreateCodingMeeting from "@/page/coding-meetings/create/CreateCodingMeetingPage"

export const metadata: Metadata = {
  title: "모각코 모임 생성",
  description: "모여서 각자 코딩 모임 생성",
}

export default function CreateCodingMeetingsPage() {
  return (
    <div>
      <CreateCodingMeeting />
    </div>
  )
}
