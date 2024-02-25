import CodingMeetingsMain from "@/page/coding-meetings/main/MainPage"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "모각코",
  description: "모여서 각자 코딩",
}

export default function CodingMeetingsMainPage() {
  return (
    <div>
      <CodingMeetingsMain />
    </div>
  )
}
