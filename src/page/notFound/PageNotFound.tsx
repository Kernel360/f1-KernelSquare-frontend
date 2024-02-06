"use client"

import NotFound404 from "@/components/shared/animation/NotFound"
import Button from "@/components/shared/button/Button"
import { useRouter } from "next/navigation"

const PageNotFound = () => {
  const router = useRouter()
  const handleRouting = () => router.replace("/")
  return (
    <div className="w-full text-center">
      <div className="max-w-[400px] m-auto my-[50px]">
        <NotFound404 />
      </div>
      <div className="font-bold text-primary text-xl mb-2">
        {"THE PAGE YOU WERE LOOKING FOR DOESN'T EXIST."}
      </div>
      <div className="text-slate-400 text-md mb-5">
        {"페이지를 찾을 수 없습니다."}
      </div>
      <Button
        buttonTheme="primary"
        className="py-2 px-3"
        onClick={() => handleRouting()}
      >
        홈으로
      </Button>
    </div>
  )
}

export default PageNotFound
