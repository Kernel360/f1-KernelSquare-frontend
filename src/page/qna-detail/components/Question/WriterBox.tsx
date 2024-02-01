"use client"

import { Icons } from "@/components/icons/Icons"
import Image from "next/image"
import { useRouter } from "next/navigation"
import type { Question } from "@/interfaces/question"

export interface WriterBoxProps {
  question: Question
}

const WriterBox: React.FC<WriterBoxProps> = ({ question }) => {
  const router = useRouter()
  return (
    <div className="flex flex-wrap">
      {question.member_image_url && (
        <div className="ml-[20px] w-[50px] h-[50px] relative">
          <Image
            src={question.member_image_url}
            alt="질문자 프로필 사진"
            fill
            className="object-cover rounded-full cursor-pointer"
            onClick={() => router.push(`/profile/${question.member_id}`)}
          />
        </div>
      )}
      {!question.member_image_url && (
        <Icons.UserProfile
          className="ml-[20px] w-[50px] h-[50px] fill-colorsGray shrink-0 cursor-pointer"
          onClick={() => router.push(`/profile/${question.member_id}`)}
        />
      )}
      <div className="ml-[20px] text-center">
        <div
          className="px-2 bg-[#F3EDC8] rounded-md mb-1 cursor-pointer"
          onClick={() => router.push(`/profile/${question.member_id}`)}
        >
          {question.nickname}
        </div>
        <div className="text-center flex mt-2 justify-around shrink-0">
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
    </div>
  )
}

export default WriterBox
