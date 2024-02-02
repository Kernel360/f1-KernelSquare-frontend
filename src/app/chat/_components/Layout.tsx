"use client"

import CupRunning from "@/components/shared/animation/CupRunning"
import LabelDivider from "@/components/shared/divider/LabelDivider"
import CoffeeChatWelcome from "@/page/coffee-chat/main/CoffeeChatWelcome"
import { keyframes } from "@emotion/react"
import styled from "@emotion/styled"
import { usePathname, useSearchParams } from "next/navigation"
import { twMerge } from "tailwind-merge"

interface CoffeeChatPageLayoutProps {
  children: React.ReactNode
}

function CoffeeChatPageLayout({ children }: CoffeeChatPageLayoutProps) {
  const pathname = usePathname()
  const searchParmas = useSearchParams()

  const popup = searchParmas.get("popup")
  const isPopup = popup && popup === "true"

  const stickyHeaderClassnames = twMerge([
    `sticky top-[calc(var(--height-header)+67px)] sm:top-[--height-header] flex flex-col gap-2 w-[calc(100%-12px)] sm:w-[calc(100%-22px)] lg:w-[calc(100%-42px)] mx-auto bg-white z-[2]`,
    isPopup && "!top-0",
  ])

  const cupWrapperClassNames = twMerge([
    `w-full flex flex-col`,
    isPopup && "-mt-5",
  ])

  const label = () => {
    if (pathname === "/chat") return "등록된 커피챗 목록"
    if (pathname.startsWith("/chat/create/")) return "커피챗 생성"
    if (pathname.startsWith("/chat/u/")) return "커피챗 수정"
    if (pathname.startsWith("/chat/room/")) return "커피챗 채팅"
    if (pathname.startsWith("/chat/")) return "커피챗 상세"

    return "커피챗 페이지"
  }

  if (pathname.startsWith("/chat/create"))
    return (
      <div>
        <div className="mt-5 w-[calc(100%-12px)] sm:w-[calc(100%-22px)] lg:w-[calc(100%-42px)] mx-auto">
          {children}
        </div>
      </div>
    )

  return (
    <div className="flex">
      <div className="relative box-border flex-1">
        <div className={stickyHeaderClassnames}>
          <div className={cupWrapperClassNames}>
            <Cup
              className={`min-w-[120px] min-h-[120px] inline-flex align-top relative w-fit transition-transform md:![animation-duration:15s] lgDevice:![animation-duration:20s]`}
            >
              <CupRunning
                style={{
                  width: "120px",
                  flexShrink: "0",
                }}
              />
            </Cup>
            <div className="text-sm px-6 py-2 -mt-10 font-bold bg-info overflow-hidden h-9 box-border">
              <CoffeeChatWelcome />
            </div>
          </div>
          <LabelDivider label={label()} />
          <div id="chat-room-header"></div>
          <div id="chat-pagination"></div>
          <div className="absolute left-0 -bottom-9 h-9 box-border w-full bg-gradient-to-t from-white/0 to-white pointer-events-none" />
        </div>
        <div className="mt-9 w-[calc(100%-12px)] sm:w-[calc(100%-22px)] lg:w-[calc(100%-42px)] mx-auto">
          {children}
        </div>
      </div>
      <aside className="bg-transparent min-h-screen hidden lg:block lg:w-32" />
    </div>
  )
}

export default CoffeeChatPageLayout

const cupMoving = keyframes`
  from {
    transform: rotateY(0deg);
    left: 0px;
  }

  50% {
    transform: rotateY(0deg);
    left: calc(100% - 120px);
  }
  51% {
    transform: rotateY(180deg);
  }

  99% {
    transform: rotateY(180deg);
    left: 0px;
  }

  to {
    transform: rotate(0deg);
    left: 0px
  }
`

const Cup = styled.div`
  animation: ${cupMoving} 10s linear infinite forwards;
`
