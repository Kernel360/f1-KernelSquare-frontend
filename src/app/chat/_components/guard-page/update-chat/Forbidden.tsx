"use client"

import Mentee from "@/components/shared/animation/Mentee"

function UpdateCoffeeChatForbidden() {
  return (
    <div className="text-center">
      <div className="w-[400px] min-h-[266px] m-auto mt-[100px]">
        <Mentee />
      </div>
      <div className="text-xl">커피챗을 수정할 권한이 없습니다.</div>
    </div>
  )
}

export default UpdateCoffeeChatForbidden
