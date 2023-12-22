"use client"

import { Icons } from "@/components/icons/Icons"
import Spacing from "@/components/shared/Spacing"
import Button from "@/components/shared/button/Button"
import { mockUsers } from "@/mocks/db/user"
import Image from "next/image"
import { useState } from "react"
import Skeleton from "react-loading-skeleton"
import type { ImageProps, TitleProps } from "./MyPage.type"

// msw 및 API call 로직 구현 후 삭제 예정
const mock = mockUsers[0]
const badge_url =
  "https://imagedelivery.net/gDNaP20ZP5HjgdRwMYWErw/f1eb002d-2732-4709-4c43-18b2c1f3a900/public"

function MyPage() {
  return (
    <div className="max-w-[60%] m-auto mt-[50px]">
      <div className="w-full flex justify-evenly mb-[50px]">
        {typeof mock.image_url === "string" && (
          <ProfileImage image_url={mock.image_url} />
        )}
        <div className="flex items-center">
          <div>
            {typeof mock.image_url === "string" && (
              <Image src={badge_url} alt="배지 이미지" width={50} height={50} />
            )}
          </div>
          <div className="font-bold text-[48px] ml-[20px]">{mock.nickname}</div>
        </div>
      </div>
      <ExperiencePoint />
      <Divider />
      <Description />
      <Divider />
    </div>
  )
}

export default MyPage

function Title({ title }: TitleProps) {
  return <div className="font-bold text-lg mb-[20px]">{title}</div>
}

function ProfileImage({ image_url }: ImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  if (!image_url)
    return (
      <Icons.UserProfile className="text-[30px] leading-8 fill-colorsGray shrink-0" />
    )

  return (
    <div>
      <div className="w-[150px] h-[150px] relative">
        <Image
          src={image_url}
          alt="프로필이미지"
          fill
          onLoad={() => setImageLoaded(true)}
          className="object-cover rounded-full"
        />
        {imageLoaded ? null : (
          <Skeleton
            circle
            width={150}
            height={150}
            className="absolute left-0 top-0"
          />
        )}
      </div>
      <Spacing size={10} />
      <Button buttonTheme="primary" className="w-[150px] h-[30px] rounded">
        프로필 변경
      </Button>
    </div>
  )
}

function ExperiencePoint() {
  return (
    <div className="mb-[50px]">
      <Title title="경험치" />
      <div className="w-full flex">
        <div className="w-4/24 text-center mr-4">0</div>
        <div className="m-auto w-full text-center flex justify-center">
          <div className="relative w-[90%] mx-[10px]">
            <div className="z-0 bg-gray-300 rounded-md h-[20px] "></div>
            {/*임시 사이즈이며 실제 경험치 표시 예정: 해당 level 달성 기준에 대한 experience 비율*/}
            <div className="absolute top-0 z-5 bg-primary rounded-md w-[10%] h-[20px] text-white text-center">
              {mock.experience}
            </div>
          </div>
        </div>
        <div className="w-4/24 text-center ml-4">500</div>
      </div>
    </div>
  )
}

function Description() {
  return (
    <div className="mb-[50px]">
      <Title title="자기소개" />
      <div>
        안녕하세요, 홍주광입니다. Spring Boot를 사용하는 백엔드 개발자입니다.
        주로 RESTful API를 개발하며, 효율적이고 확장 가능한 솔루션을 찾는 것을
        즐깁니다. 테스트 주도 개발과 코드 품질에 중점을 두어 유지보수가 용이하고
        안정적인 코드를 작성하는 것이 제 목표입니다. 새로운 기술에 대한 학습과
        협업을 중요시하며, 함께 성장하고자 합니다. ~
      </div>
    </div>
  )
}

function Divider() {
  return <div className="bg-slate-400 h-[2px] w-full mb-[50px]"></div>
}
