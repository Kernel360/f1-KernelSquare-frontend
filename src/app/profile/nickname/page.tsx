import EditNicknamePage from "@/page/user-profile/edit-nickname/EditNicknamePage"
import { getServerSession } from "@/util/auth"
import { Metadata } from "next"

export function generateMetadata(): Metadata {
  const fallbackMetadata: Metadata = {
    title: "닉네임 수정",
    description: "유저 닉네임 수정 페이지",
    openGraph: {
      title: "닉네임 수정 - 커널스퀘어",
      description: "유저 닉네임 수정 페이지",
      images: {
        url: "/og.png",
        alt: "Kernel Square",
      },
    },
    twitter: {
      title: "닉네임 수정 - 커널스퀘어",
      description: "유저 닉네임 수정 페이지",
      images: {
        url: "/og.png",
        alt: "Kernel Square",
      },
    },
  }

  try {
    const { user } = getServerSession()

    if (!user) return fallbackMetadata

    const { nickname } = user

    return {
      title: `${nickname} : 닉네임 수정`,
      description: `{ ${nickname} }의 닉네임 수정 페이지`,
    }
  } catch (error) {
    return fallbackMetadata
  }
}

export default function EditNickname() {
  return (
    <div className="p-4">
      <section className="flex items-center mb-8">
        <h3 className="font-bold text-2xl">닉네임 수정</h3>
      </section>
      <EditNicknamePage />
    </div>
  )
}
