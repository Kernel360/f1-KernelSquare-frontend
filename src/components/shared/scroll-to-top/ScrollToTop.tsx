"use client"

import { Icons } from "@/components/icons/Icons"
import { buttonMessage } from "@/constants/message"
import { usePathname } from "next/navigation"

const ScrollToTop = () => {
  const pathname = usePathname()
  const needScroll = pathname.includes("question")

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  if (!needScroll) return null

  return (
    <div className="fixed right-[5%] bottom-[5%] z-10">
      <button
        className="w-[70px] h-[70px] font-bold rounded-full outline-none cursor-pointer bg-secondary hover:bg-primary transition duration-200 ease-in-out"
        onClick={scrollToTop}
      >
        <div className="flex justify-center mt-[-5px]">
          <Icons.ScrollToTop className="text-white text-[30px]" />
        </div>
        <div className="text-white text-sm text-center mt-[-5px]">
          {buttonMessage.scrollToTop}
        </div>
      </button>
    </div>
  )
}

export default ScrollToTop
