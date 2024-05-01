import Profile from "@/components/shared/user/Profile"
import { useClientSession } from "@/hooks/useClientSession"
import { useRouter } from "next/navigation"
import { twMerge } from "tailwind-merge"

function MobileMenuProfileArea() {
  const { user } = useClientSession()
  const { push } = useRouter()

  const profileClassNames = twMerge([
    user
      ? "cursor-pointer hover:cursor-pointer"
      : "cursor-default hover:cursor-default",
  ])

  const profileTextClassNames = twMerge([user && "font-bold"])

  const handleProfileClick = () => {
    if (user) {
      push(`/profile/${user.member_id}`)
    }
  }

  return (
    <div className="flex w-full items-center gap-4">
      <Profile
        profileImage={user ? user.image_url : null}
        className={profileClassNames}
        onClick={handleProfileClick}
      />
      <div className={profileTextClassNames}>
        {user ? user.nickname : "로그인이 필요합니다"}
      </div>
    </div>
  )
}

export default MobileMenuProfileArea
