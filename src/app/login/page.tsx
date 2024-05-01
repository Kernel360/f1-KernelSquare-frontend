import LoginPage from "@/page/login/LoginPage"
import { getServerSession } from "@/util/auth"
import { Metadata } from "next"
import LoginGuardModal from "@/components/shared/auth-modal/LoginGuardModal"

export const metadata: Metadata = {
  title: "로그인",
  description: "커널스퀘어에 로그인하고 다양한 서비스를 이용해 보세요",
  openGraph: {
    title: "로그인",
    description: "커널스퀘어에 로그인하고 다양한 서비스를 이용해 보세요",
  },
  twitter: {
    title: "로그인",
    description: "커널스퀘어에 로그인하고 다양한 서비스를 이용해 보세요",
  },
}

export default function Login() {
  const { user } = getServerSession()

  if (user) {
    return <LoginGuardModal />
  }

  return <LoginPage />
}
