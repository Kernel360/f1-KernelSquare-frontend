"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"

const LandingHeader = () => {
  const router = useRouter()
  const [isBackDrop, setIsBackDrop] = useState(false)

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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    // 컴포넌트가 언마운트 될 때 이벤트 리스너 제거
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className={headerClassName}>
      <div className="cursor-pointer" onClick={() => router.push("/qna")}>
        개발자 Q&A
      </div>
      <div className="cursor-pointer" onClick={() => router.push("/chat")}>
        커피챗
      </div>
      <div
        className="cursor-pointer"
        onClick={() => router.push("/coding-meetings")}
      >
        모각코
      </div>
    </div>
  )
}

export default LandingHeader
