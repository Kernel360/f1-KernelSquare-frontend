import { SocialType } from "@/interfaces/social"
import Button from "./shared/button/Button"
import { twJoin } from "tailwind-merge"
import KakaoIcon from "./icons/social/Kakao"
import GoogleIcon from "./icons/social/Google"
import GithubIcon from "./icons/social/Github"
import useModal from "@/hooks/useModal"
import { useRouter } from "next/navigation"
import { RouteMap } from "@/service/route-map"

type SocialAction = "login"

interface SocialButtonProps {
  social: SocialType
  action?: SocialAction
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

function SocialButton({ social, action, onClick }: SocialButtonProps) {
  const { push } = useRouter()
  const { closeModal } = useModal()

  const bgClassNames = twJoin([
    "p-2",
    social === "kakao" && "bg-socialKakao",
    social === "google" && "bg-socialGoogle",
    social === "github" && "bg-socialGithub",
  ])

  const socialLogin = ({
    social,
    event,
  }: {
    social: SocialType
    event: React.MouseEvent<HTMLButtonElement>
  }) => {
    switch (social) {
      case "github":
        // 현재는 github 로그인만 제공
        closeModal()

        push(`${process.env.NEXT_PUBLIC_SERVER}${RouteMap.oauth.login.github}`)

        break
      default:
        break
    }
  }

  const handleSocialAction =
    ({ social, action }: { social: SocialType; action?: SocialAction }) =>
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!action) {
        onClick && onClick(e)

        return
      }

      if (action === "login") {
        socialLogin({ social, event: e })
      }
    }

  return (
    <Button
      className={bgClassNames}
      onClick={handleSocialAction({ social, action })}
    >
      {SocialIcon[social]}
    </Button>
  )
}

const SocialIcon: Record<SocialType, JSX.Element> = {
  kakao: <KakaoIcon />,
  google: <GoogleIcon />,
  github: <GithubIcon />,
}

export default SocialButton
