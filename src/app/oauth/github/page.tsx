import AuthGuardModal from "@/components/shared/auth-modal"
import OAuthGithubError from "@/page/oauth/github/error/OAuthGithubError"
import OAuthGithubInternelError from "@/page/oauth/github/error/OAuthGithubInternelError"
import OAuthGithubRedirect from "@/page/oauth/github/OAuthGithubRedirect"
import OAuthGithubSuccess from "@/page/oauth/github/OAuthGithubSuccess"
import { getServerSession } from "@/util/auth"
import { Metadata } from "next"
import { cookies } from "next/headers"

interface OAuthGihubProps {
  searchParams?: {
    errorCode?: string
    errorMessage?: string
  }
}

export const metadata: Metadata = {
  title: "github 소셜로그인",
  description: "github 소셜로그인",
}

export default function OAuthGithub({ searchParams }: OAuthGihubProps) {
  const { user } = getServerSession()

  const loginResponseCookie = cookies().get("loginResponse")?.value
  const decodedLoginResponseCookie = loginResponseCookie
    ? Buffer.from(loginResponseCookie, "base64").toString("utf-8")
    : ""

  const error = searchParams?.errorCode
    ? {
        errorCode: Number(searchParams.errorCode),
        errorMessage: searchParams.errorMessage,
      }
    : null

  if (user) {
    return loginResponseCookie ? (
      <OAuthGithubRedirect />
    ) : (
      <AuthGuardModal page="oauth" />
    )
  }

  if (error) {
    return (
      <OAuthGithubError
        errorCode={error.errorCode}
        errorMessage={error.errorMessage}
      />
    )
  }

  if (!decodedLoginResponseCookie) {
    return <OAuthGithubInternelError type={"notHasDecodedCookie"} />
  }

  return <OAuthGithubSuccess decodedCookie={decodedLoginResponseCookie} />
}
