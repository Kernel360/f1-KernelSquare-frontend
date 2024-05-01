import LoginForm from "@/components/form/LoginForm"
import Button from "@/components/shared/button/Button"
import PageInfoArea from "@/components/shared/page-template/page-info-area/PageInfoArea"
import useModal from "@/hooks/useModal"
import { useRouter } from "next/navigation"
import { twMerge } from "tailwind-merge"
import CodingMeetingAreaImage from "@/page/coding-meetings/main/info-area/AreaImage"
import { useClientSession } from "@/hooks/useClientSession"

function CoffeeChatInfoArea() {
  const wrapperClassNames = twMerge([
    `flex w-full justify-between items-center bg-[#EAF7F0] rounded-md overflow-hidden border border-transparent sm:border-[#E0E0E0]`,
    `p-4`,
    `sm:p-0 sm:bg-white sm:h-[97px] sm:pr-[34px]`,
  ])

  return (
    <PageInfoArea className={wrapperClassNames}>
      <PageInfoArea.NotLoginedUserArea>
        <NotLoginedUserArea />
      </PageInfoArea.NotLoginedUserArea>
      <PageInfoArea.LoginedUserArea>
        <LoginedUserArea />
      </PageInfoArea.LoginedUserArea>
    </PageInfoArea>
  )
}

export default CoffeeChatInfoArea

function NotLoginedUserArea() {
  return (
    <>
      <div className="flex items-center">
        <CodingMeetingAreaImage className="sm:block" />
        <AreaText logined={false} />
      </div>
      <AreaButton logined={false} />
    </>
  )
}

function LoginedUserArea() {
  return (
    <>
      <div className="flex items-center">
        <CodingMeetingAreaImage className="sm:block" />
        <AreaText logined={true} />
      </div>
      <AreaButton logined={true} />
    </>
  )
}

function AreaText({ logined }: { logined: boolean }) {
  const { user } = useClientSession()

  const getTextContent = () => {
    if (logined) {
      if (user?.roles.includes("ROLE_MENTOR")) {
        return "커피 챗을\n계획하고 계신가요?"
      }

      return "커피 챗을 통해\n지속 가능한 성장을 경험해 보세요!"
    }

    return "멘토가 되어\n커피 챗을 생성해 보세요!"
  }

  return (
    <div className="whitespace-pre-line text-[#7E8280] font-normal sm:whitespace-normal sm:text-primary sm:font-semibold">
      {getTextContent()}
    </div>
  )
}

function AreaButton({ logined }: { logined: boolean }) {
  const { user } = useClientSession()

  const { push } = useRouter()
  const { openModal } = useModal()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (logined) {
      push(`/chat/create`)

      return
    }

    openModal({
      content: <LoginForm />,
    })
  }

  if (logined && !user?.roles.includes("ROLE_MENTOR")) return null

  return (
    <Button
      className="px-6 py-4 w-max shrink-0 font-semibold text-sm underline bg-transparent sm:bg-primary sm:no-underline sm:text-white"
      onClick={handleClick}
    >
      {logined ? "커피챗 생성하기" : "로그인 하기"}
    </Button>
  )
}
