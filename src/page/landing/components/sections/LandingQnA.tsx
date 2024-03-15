"use client"

import Image from "next/image"
import LandingContainer from "../LandingContainer"
import landing_qna_image from "@/assets/landing/qna_image.svg"
import landing_qna_text from "@/assets/landing/qna_text.svg"
import square_line from "@/assets/landing/square_line.svg"
import { useRef } from "react"
import useHeaderObserver from "../../hooks/useHeaderObserver"

const LandingQnA = () => {
  const qnaRef = useRef<HTMLImageElement>(null)

  useHeaderObserver({ ref: qnaRef, keyword: "개발자 Q&A" })

  return (
    <LandingContainer className="flex justify-center items-center gap-10">
      <div className="flex flex-col sm:flex-row gap-10">
        <Image
          src={landing_qna_image}
          alt="landing_qna_image"
          width={600}
          data-aos="fade-up"
          className="w-[400px] sm:w-[600px]"
          ref={qnaRef}
        />
        <Image
          src={landing_qna_text}
          alt="landing_qna_text"
          width={600}
          data-aos="fade-up"
          className="mt-10 w-[400px] sm:w-[600px]"
        />
      </div>
      <div className="hidden sm:block">
        <Image
          src={square_line}
          alt="square_line"
          height={600}
          data-aos="fade-down"
        />
      </div>
    </LandingContainer>
  )
}

export default LandingQnA
