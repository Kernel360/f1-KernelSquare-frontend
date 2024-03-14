import { RouteMap } from "@/service/route-map"

interface OAuthGithubPageProps {
  error: {
    errorCode: number
    errorMessage?: string
  } | null
}

function OAuthGithubPage({ error }: OAuthGithubPageProps) {
  console.log({ error })

  return (
    <div>
      githubOauth
      <div>{RouteMap.oauth.login.github}</div>
    </div>
  )
}

export default OAuthGithubPage
