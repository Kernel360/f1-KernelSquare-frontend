import type { Question } from "@/interfaces/question"
import Image from "next/image"

interface WriterProps {
  question: Question
}

const WriterBox = ({ question }: WriterProps) => {
  return (
    <>
      <div className="ml-[20px] w-[50px] h-[50px] relative">
        <Image
          src={question.member_image_url}
          alt="질문자 프로필 사진"
          fill
          className="object-cover rounded-full"
        />
      </div>
      <div className="ml-[20px] text-center">
        <div className="px-2 bg-[#F3EDC8] rounded-md mb-1">
          {question.nickname}
        </div>
        <div className="text-center flex mt-2 justify-around">
          <div>
            <Image
              src={question.level_image_url}
              alt="질문자 등급 배지"
              width={20}
              height={20}
            />
          </div>
          <div>Lv. {question.level}</div>
        </div>
      </div>
    </>
  )
}

export default WriterBox
