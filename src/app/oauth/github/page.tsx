import OAuthGithubPage from "@/page/oauth/github/OAuthGithubPage"
import { Metadata } from "next"

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
  const error = searchParams?.errorCode
    ? {
        errorCode: Number(searchParams.errorCode),
        errorMessage: searchParams.errorMessage,
      }
    : null

  return <OAuthGithubPage error={error} />
}
