import Mentee from "@/components/shared/animation/Mentee"
import notificationMessage from "@/constants/message/notification"
import CreateCodingMeetingPage from "@/page/coding-meetings/create/CreateCodingMeetingPage"

import { getServerSession } from "@/util/auth"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: `모각코 생성`,
  description: `모각코 생성 페이지`,
  robots: {
    index: false,
  },
  openGraph: {
    title: `모각코 생성 - 커널스퀘어`,
    description: `모각코 생성 페이지`,
    images: {
      url: "/og.png",
      alt: "Kernel Square",
    },
  },
  twitter: {
    title: `모각코 생성 - 커널스퀘어`,
    description: `모각코 생성 페이지`,
    images: {
      url: "/og.png",
      alt: "Kernel Square",
    },
  },
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
          <div className="text-xl">{notificationMessage.unauthorized}.</div>
        </div>
      )
    }

    return <CreateCodingMeetingPage editMode="create" />
  } catch (error) {
    notFound()
  }
}
