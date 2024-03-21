import OAuthGithubErrorField from "./OAuthGithubErrorField"
import OAuthGithubErrorWrapper from "./OAuthGithubErrorWrapper"

type OAuthGithubInternelErrorType = "notHasDecodedCookie"

interface OAuthGithubInternelErrorProps {
  type: OAuthGithubInternelErrorType
}

function OAuthGithubInternelError({ type }: OAuthGithubInternelErrorProps) {
  const Content = () => {
    switch (type) {
      case "notHasDecodedCookie":
        return <span>유효한 응답이 아닙니다</span>
      default:
        return <span>알 수 없는 에러가 발생했습니다</span>
    }
  }

  return (
    <OAuthGithubErrorWrapper>
      <div>
        <OAuthGithubErrorField fieldName="type" payload={<span>{type}</span>} />
        <OAuthGithubErrorField fieldName="message" payload={<Content />} />
      </div>
    </OAuthGithubErrorWrapper>
  )
}

export default OAuthGithubInternelError
