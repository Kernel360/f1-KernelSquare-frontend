import LoginForm from "@/components/form/LoginForm"
import Button from "@/components/shared/button/Button"
import PageInfoArea from "@/components/shared/page-template/page-info-area/PageInfoArea"
import useModal from "@/hooks/useModal"
import CodingMeetingAreaImage from "@/page/coding-meetings/main/info-area/AreaImage"
import { useRouter } from "next/navigation"
import { twMerge } from "tailwind-merge"

function QnAInfoArea() {
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

export default QnAInfoArea

function NotLoginedUserArea() {
  return (
    <>
      <div className="flex items-center">
        <CodingMeetingAreaImage />
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
        <CodingMeetingAreaImage />
        <AreaText logined={true} />
      </div>
      <AreaButton logined={true} />
    </>
  )
}

function AreaText({ logined }: { logined: boolean }) {
  const textContent = logined
    ? "아직 원하시는 질문을\n찾지 못하셨나요?"
    : "로그인하고\n질문을 작성해보세요"

  return (
    <div className="whitespace-pre-line text-[#7E8280] font-normal sm:whitespace-normal sm:text-primary sm:font-semibold">
      {textContent}
    </div>
  )
}

function AreaButton({ logined }: { logined: boolean }) {
  const { push } = useRouter()
  const { openModal } = useModal()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (logined) {
      push(`/question`)

      return
    }

    openModal({
      content: <LoginForm />,
    })
  }

  return (
    <Button
      className="px-6 py-4 w-max shrink-0 font-semibold text-sm underline bg-transparent sm:bg-primary sm:no-underline sm:text-white"
      onClick={handleClick}
    >
      {logined ? "질문 작성" : "로그인 하기"}
    </Button>
  )
}
