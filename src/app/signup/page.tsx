import AuthGuardModal from "@/components/shared/auth-modal"
import { layoutMeta } from "@/constants/layoutMeta"
import Signup from "@/page/signup/Signup"
import { isLogined } from "@/util/auth"
import { Metadata } from "next"

export const revalidate = 0

export const metadata: Metadata = {
  title: `${layoutMeta["signup"].title}`,
  description: `${layoutMeta["signup"].description}`,
  openGraph: {
    title: `${layoutMeta["signup"].title} - 커널스퀘어`,
    description: `${layoutMeta["signup"].description}`,
    url: "https://kernelsquare.live/signup",
    images: {
      url: "/og.png",
      alt: "Kernel Square",
    },
  },
  twitter: {
    title: `${layoutMeta["signup"].title} - 커널스퀘어`,
    description: `${layoutMeta["signup"].description}`,
    images: {
      url: "/og.png",
      alt: "Kernel Square",
    },
  },
}

export default async function SignupPage() {
  if (isLogined()) {
    return <AuthGuardModal page="signup" />
  }

  return <Signup />
}
