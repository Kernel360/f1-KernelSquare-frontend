"use client"

import { mockUsers } from "@/mocks/db/user"
import Image from "next/image"
import ProfileImage from "./components/ProfileImage"
import ExperiencePoint from "./components/ExperiencePoint"
import { basic_profile } from "@/assets/images/basic"
import badge_url from "@/assets/images/badges"

// msw 및 API call 로직 구현 후 삭제 예정
const mock = mockUsers[1]

function MyPage() {
  return (
    <div className="max-w-[60%] m-auto mt-[50px]">
      <div className="w-full flex justify-evenly mb-[50px]">
        <ProfileImage
          image_url={
            typeof mock.image_url === "string" ? mock.image_url : basic_profile
          }
        />
        <div className="flex items-center">
          <div>
            <Image
              src={badge_url[mock.level]}
              alt="배지 이미지"
              width={50}
              height={50}
            />
          </div>
          <div className="font-bold text-[48px] ml-[20px]">{mock.nickname}</div>
        </div>
      </div>
      <ExperiencePoint level={mock.level} exp={mock.experience} />
      <Divider />
      <Introduction />
      <Divider />
    </div>
  )
}

export default MyPage

function Introduction() {
  return (
    <div className="mb-[50px]">
      <div className="font-bold text-lg mb-[20px]">자기소개</div>
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
