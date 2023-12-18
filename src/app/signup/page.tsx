import { layoutMeta } from "@/constants/layoutMeta"
import Signup from "@/page/signup/Signup"
import { Metadata } from "next"
import { cookies } from "next/headers"
import { decode } from "jsonwebtoken"
import { User } from "@/interfaces/user"
import { getMemeber } from "@/service/member"
import { ACCESS_TOKEN_KEY } from "@/constants/token"
import { redirect } from "next/navigation"
import SignupGuard from "@/page/signup/components/SignupGuard"

export const metadata: Metadata = {
  title: `${layoutMeta["signup"].title}`,
  description: `${layoutMeta["signup"].description}`,
}

export default async function SignupPage() {
  let isUser = false

  const cookieStore = cookies().getAll()

  const accessToken = cookieStore.find(
    (cookie) => cookie.name === ACCESS_TOKEN_KEY,
  )?.value
  if (accessToken) {
    const { id } = decode(accessToken) as User & {
      id: number
    }

    try {
      await getMemeber({ id })

      isUser = true
    } catch (err) {}
  }

  if (isUser) return <SignupGuard />

  return <Signup />
}
