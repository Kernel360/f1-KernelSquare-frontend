"use client"

import Mentee from "@/components/shared/animation/Mentee"

function CreateChatForbidden() {
  return (
    <div className="text-center">
      <div className="w-[400px] min-h-[266px] m-auto mt-[100px]">
        <Mentee />
      </div>
      <div className="text-xl">멘토에게만 허용된 기능입니다.</div>
    </div>
  )
}

export default CreateChatForbidden
