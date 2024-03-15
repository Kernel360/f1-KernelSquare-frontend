"use client"

import { HeaderTab } from "@/constants/landing"
import landingTabAtom from "@/recoil/atoms/landingTab"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { twJoin, twMerge } from "tailwind-merge"

const LandingHeader = () => {
  const router = useRouter()
  const [isBackDrop, setIsBackDrop] = useState(false)
  const [landingTab, setLandingTab] = useRecoilState(landingTabAtom)

  const handleScroll = () => {
    if (window.scrollY > window.innerHeight) {
      setIsBackDrop(true)
    } else {
      setIsBackDrop(false)
    }
  }

  const headerClassName = twMerge([
    "fixed w-full top-0 py-5 flex justify-around items-center text-white text-xl z-[2] bg-transparent transition-colors duration-500",
    isBackDrop && "backdrop-blur",
    !isBackDrop && "bg-black/[0.15]",
  ])

  const tabClassName = (text: string) =>
    twJoin([
      "cursor-pointer hover:text-primary hover:font-bold",
      landingTab && text === landingTab && "text-primary font-bold",
    ])

  useEffect(() => {
    setLandingTab(undefined)
    window.addEventListener("scroll", handleScroll)

    // 컴포넌트가 언마운트 될 때 이벤트 리스너 제거
    return () => window.removeEventListener("scroll", handleScroll)
  }, [setLandingTab])

  return (
    <div className={headerClassName}>
      {HeaderTab.map((tab) => (
        <div
          className={tabClassName(tab.title)}
          onClick={() => router.push(tab.url)}
          key={tab.title}
        >
          {tab.title}
        </div>
      ))}
    </div>
  )
}

export default LandingHeader
