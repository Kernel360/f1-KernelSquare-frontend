"use client"

import Button from "@/components/shared/button/Button"
import LandingContainer from "../LandingContainer"
import LoginForm from "@/components/form/LoginForm"
import useModal from "@/hooks/useModal"
import { useRouter } from "next/navigation"
import { useClientSession } from "@/hooks/useClientSession"

const LandingLogIn = () => {
  const { openModal } = useModal()
  const { push } = useRouter()
  const { user } = useClientSession()
  const handleButtonClick = () =>
    user ? push("/qna") : openModal({ content: <LoginForm /> })

  return (
    <LandingContainer className="relative flex flex-col justify-center items-center text-center gap-10 font-extralight">
      <div
        className="text-lg sm:text-2xl italic"
        data-aos="fade-down"
        data-aos-anchor-placement="top-bottom"
      >
        <div>{"Together we learn, together we grow."}</div>
        <div>{"Let's strive to unleash the power of continuous growth"}</div>
        <div>
          {"through communication with colleagues and knowledge exchange."}
        </div>
      </div>
      <div
        className="text-2xl sm:text-4xl font-bold"
        data-aos="fade-down"
        data-aos-anchor-placement="top-bottom"
      >
        <div>성장하는 개발자에</div>
        <div>한 발자국 더 가까워지고 싶다면?</div>
      </div>
      <div
        className="text-3xl sm:text-[50px] font-bold text-primary"
        data-aos="fade-down"
        data-aos-anchor-placement="top-bottom"
      >
        지금 커널 스퀘어와 함께 하세요
      </div>
      <div
        className="flex gap-10"
        data-aos="fade-down"
        data-aos-anchor-placement="top-bottom"
      >
        {/* <Button className="bg-transparent border-[1px] border-white w-[200px] h-[50px] rounded-[50px] text-2xl hover:bg-primary hover:border-primary hover:text-white">
        <Link href="/signup">회원가입</Link>
      </Button> */}
        <Button
          className="bg-transparent border-[1px] border-white w-[200px] h-[50px] rounded-[50px] text-2xl hover:bg-primary hover:border-primary hover:text-white"
          onClick={() => handleButtonClick()}
        >
          {user ? "시작하기" : "로그인"}
        </Button>
      </div>
      <div className="absolute bottom-0 w-full h-[50px] bg-transparent bg-[#303030] text-white text-center">
        © 2024. Kernel Square. All rights reserved.
      </div>
    </LandingContainer>
  )
}

export default LandingLogIn
