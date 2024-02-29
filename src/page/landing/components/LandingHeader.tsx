"use client"

import { useRouter } from "next/navigation"

const LandingHeader = () => {
  const router = useRouter()
  return (
    <div className="w-full absolute top-0 py-5 flex justify-around items-center text-white text-xl bg-transparent">
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
