import NotificationPage from "@/page/notification/NotificationPage"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "알림 조회",
  description: "개인 알림 조회",
}

export default function Notification() {
  return <NotificationPage />
}
