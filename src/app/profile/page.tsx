import AuthGuardModal from "@/components/shared/auth-modal/AuthGuardModal"
import { layoutMeta } from "@/constants/layoutMeta"
import MyPage from "@/page/profile/MyPage"
import { isLogined } from "@/util/auth"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: `${layoutMeta["profile"].title}`,
  description: `${layoutMeta["profile"].description}`,
}

export default function ProfilePage() {
  if (!isLogined()) {
    return <AuthGuardModal page="question" />
  }

  return <MyPage />
}
