import Mentee from "@/components/shared/animation/Mentee"
import { errorMessage } from "@/constants/message"
import CreateCodingMeetingPage from "@/page/coding-meetings/create/CreateCodingMeetingPage"

import { getServerSession } from "@/util/auth"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: `모각코 생성`,
  description: `모각코 생성`,
}

export default async function CreateCodingMeetingsPage() {
  const { user } = getServerSession()

  // [TODO]
  try {
    if (!user) {
      return (
        <div className="text-center">
          <div className="w-[400px] m-auto mt-[100px]">
            <Mentee />
          </div>
          <div className="text-xl">{errorMessage.unauthorized}.</div>
        </div>
      )
    }

    return <CreateCodingMeetingPage editMode="create" />
  } catch (error) {
    notFound()
  }
}
