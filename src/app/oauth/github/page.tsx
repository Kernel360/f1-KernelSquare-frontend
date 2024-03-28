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

  const error = parseErrorFromQs({ searchParams })

  if (user) {
    return loginResponseCookie ? (
      <OAuthGithubRedirect />
    ) : (
      <AuthGuardModal page="oauth" />
    )
  }

  if (error) {
    return <OAuthGithubError errorCode={error.errorCode} />
  }

  if (!decodedLoginResponseCookie) {
    return <OAuthGithubInternelError type={"notHasDecodedCookie"} />
  }

  return <OAuthGithubSuccess decodedCookie={decodedLoginResponseCookie} />
}

function parseErrorFromQs({
  searchParams,
}: Pick<OAuthGihubProps, "searchParams">) {
  const knownErrorCode = [1106, 9999]

  if (searchParams?.errorCode) {
    const errorCode = Number(searchParams.errorCode)

    if (
      Number.isNaN(errorCode) ||
      errorCode < 0 ||
      searchParams.errorCode.includes(".")
    ) {
      return {
        errorCode: 9999,
      }
    }

    if (!knownErrorCode.includes(errorCode)) {
      return {
        errorCode: 9999,
      }
    }

    return {
      errorCode,
    }
  }

  return null
}
