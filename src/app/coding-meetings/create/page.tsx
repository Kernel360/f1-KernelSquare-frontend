import Mentee from "@/components/shared/animation/Mentee"
import notificationMessage from "@/constants/message/notification"
import CreateCodingMeetingPage from "@/page/coding-meetings/create/CreateCodingMeetingPage"

import { getServerSession } from "@/util/auth"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import CreateCodingMeetingUnauthorized from "../_components/guard-page/Unauthorized"

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

  try {
    if (!user) {
      return <CreateCodingMeetingUnauthorized />
    }

    return <CreateCodingMeetingPage editMode="create" />
  } catch (error) {
    notFound()
  }
}
