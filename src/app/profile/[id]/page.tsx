import AuthGuardModal from "@/components/shared/auth-modal"
import { UserPayload } from "@/interfaces/dto/member/get-member.dto"
import { getMemeber } from "@/service/member"
import { isLogined } from "@/util/auth"
import { extractTextFromMarkdown } from "@/util/markdown"
import { Metadata } from "next"
import dynamic from "next/dynamic"
import { notFound } from "next/navigation"

interface UserProfilePageProps {
  params: {
    id: string
  }
}

/*
  현재 정책상 로그인 되어있지 않으면,
  유저 정보를 받을 수 없기 때문에
  현재는 소셜 공유시 fallbackMetatdata로 보여질 것임
  (추후 SEO를 위해 API가 생긴다면, 수정될 수 있음)
*/
export async function generateMetadata({
  params,
}: UserProfilePageProps): Promise<Metadata> {
  const fallbackMetadata: Metadata = {
    title: "유저 프로필",
    description: "로그인 후 유저 프로필 페이지를 볼 수 있습니다.",
    openGraph: {
      title: "유저 프로필",
      description: "로그인 후 유저 프로필 페이지를 볼 수 있습니다.",
      images: {
        url: "/og.png",
        alt: "Kernel Square",
      },
    },
    twitter: {
      title: "유저 프로필",
      description: "로그인 후 유저 프로필 페이지를 볼 수 있습니다.",
      images: {
        url: "/og.png",
        alt: "Kernel Square",
      },
    },
  }

  if (!isValidPageProps({ params })) {
    return fallbackMetadata
  }

  const id = Number(params.id)

  try {
    const res = await getMemeber({ id })

    const { nickname, introduction, image_url } = res.data.data as UserPayload

    const userIntroduction = introduction
      ? extractTextFromMarkdown(introduction)
      : `${nickname} 프로필 페이지입니다.`

    return {
      title: `${nickname} : 프로필`,
      description: userIntroduction,
      openGraph: {
        title: `${nickname} : 프로필 - 커널스퀘어`,
        description: userIntroduction,
        images: {
          url: image_url ?? "/og.png",
          alt: `${nickname} 프로필 이미지`,
        },
      },
      twitter: {
        title: `${nickname} : 프로필 - 커널스퀘어`,
        description: userIntroduction,
        images: {
          url: image_url ?? "/og.png",
          alt: `${nickname} 프로필 이미지`,
        },
      },
    }
  } catch (error) {
    return fallbackMetadata
  }
}

function isValidPageProps({ params }: UserProfilePageProps) {
  const id = params.id

  if (Number(id) < 0 || params.id.includes(".") || Number.isNaN(id)) {
    return false
  }

  return true
}

const UserProfile = dynamic(() => import("@/page/user-profile/UserProfile"), {
  ssr: false,
  loading(loadingProps) {
    return <div className="w-full min-h-screen" />
  },
})

export default function UserProfilePage({ params }: UserProfilePageProps) {
  const id = Number(params.id)

  if (!isValidPageProps({ params })) {
    notFound()
  }

  if (!isLogined()) {
    return <AuthGuardModal page="userProfile" />
  }

  return (
    <div>
      <UserProfile memberId={id} />
    </div>
  )
}
