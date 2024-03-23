import OAuthGithubErrorField from "./OAuthGithubErrorField"
import OAuthGithubErrorWrapper from "./OAuthGithubErrorWrapper"

interface OAuthGithubErrorProps {
  errorCode: number
  errorMessage?: string
}

function OAuthGithubError({ errorCode, errorMessage }: OAuthGithubErrorProps) {
  return (
    <OAuthGithubErrorWrapper>
      <div>
        <OAuthGithubErrorField
          fieldName="code"
          payload={<span>{errorCode ?? "unknown"}</span>}
        />
        <OAuthGithubErrorField
          fieldName="message"
          payload={
            <span>{errorMessage ?? "깃헙 로그인 중 에러가 발생했습니다"}</span>
          }
        />
      </div>
    </OAuthGithubErrorWrapper>
  )
}

export default OAuthGithubError
