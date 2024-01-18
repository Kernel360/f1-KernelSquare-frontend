import AuthGuardModal from "@/components/shared/auth-modal"
import { UserPayload } from "@/interfaces/dto/member/get-member.dto"
import { getMemeber } from "@/service/member"
import { isLogined } from "@/util/auth"
import { Metadata } from "next"
import dynamic from "next/dynamic"
import { notFound } from "next/navigation"

interface UserProfilePageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params,
}: UserProfilePageProps): Promise<Metadata> {
  if (!isValidPageProps({ params })) {
    return {
      title: `유저 프로필`,
      description: `유저 프로필 페이지`,
    }
  }

  const id = Number(params.id)

  try {
    const res = await getMemeber({ id })

    const { nickname, introduction } = res.data.data as UserPayload

    return {
      title: `${nickname} : 프로필`,
      description: introduction ?? `{ ${nickname} }의 프로필 페이지`,
    }
  } catch (error) {
    return {
      title: `유저 프로필`,
      description: `유저 프로필 페이지`,
    }
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
