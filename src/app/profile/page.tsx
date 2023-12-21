import { layoutMeta } from "@/constants/layoutMeta"
import MyPage from "@/page/profile/MyPage"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: `${layoutMeta["profile"].title}`,
  description: `${layoutMeta["profile"].description}`,
}

export default function ProfilePage() {
  return <MyPage />
}
