import NotificationPage from "@/page/notification/NotificationPage"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "알림 조회",
  description: "개인 알림 조회",
  openGraph: {
    title: "알림 조회 - 커널스퀘어",
    description: "개인 알림 조회",
    images: {
      url: "/og.png",
      alt: "Kernel Square",
    },
  },
  twitter: {
    title: "알림 조회 - 커널스퀘어",
    description: "개인 알림 조회",
    images: {
      url: "/og.png",
      alt: "Kernel Square",
    },
  },
}

export default function Notification() {
  return <NotificationPage />
}
