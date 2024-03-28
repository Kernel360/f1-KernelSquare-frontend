import OAuthGithubErrorField from "./OAuthGithubErrorField"
import OAuthGithubErrorWrapper from "./OAuthGithubErrorWrapper"

interface OAuthGithubErrorProps {
  errorCode: number
  errorMessage?: string
}

const errorMessage = {
  1106: "깃허브 설정에서 이메일 정보를 허용해 주세요",
  9999: "깃허브 로그인에 실패하였습니다",
} as Record<number, string>

function OAuthGithubError({ errorCode }: OAuthGithubErrorProps) {
  return (
    <OAuthGithubErrorWrapper>
      <div>
        <OAuthGithubErrorField
          fieldName="code"
          payload={<span>{errorCode}</span>}
        />
        <OAuthGithubErrorField
          fieldName="message"
          payload={<span>{errorMessage[errorCode]}</span>}
        />
      </div>
    </OAuthGithubErrorWrapper>
  )
}

export default OAuthGithubError
