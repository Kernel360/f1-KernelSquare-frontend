import { SocialType } from "@/interfaces/social"
import Button from "./shared/button/Button"
import { twJoin } from "tailwind-merge"
import KakaoIcon from "./icons/social/Kakao"
import GoogleIcon from "./icons/social/Google"
import GithubIcon from "./icons/social/Github"

interface SocialButtonProps {
  social: SocialType
  action?: "login" | "signup"
  onClick?: () => void
}

function SocialButton({ social, action, onClick }: SocialButtonProps) {
  const bgClassNames = twJoin([
    "p-2",
    social === "kakao" && "bg-socialKakao",
    social === "google" && "bg-socialGoogle",
    social === "github" && "bg-socialGithub",
  ])

  const socialLogin = async (social: SocialType) => {
    console.log(social, "login")
  }

  const socialSignup = async (social: SocialType) => {
    console.log(social, "signup")
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!action) {
      onClick && onClick()

      return
    }

    const targetSocial = e.currentTarget.name as SocialType

    action === "login" ? socialLogin(targetSocial) : socialSignup(targetSocial)
  }

  return (
    <Button name={social} className={bgClassNames} onClick={handleClick}>
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
