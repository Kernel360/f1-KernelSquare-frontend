"use client"

import { mockQuestions } from "@/mocks/db/questions"
import QnAList from "../qna/components/QnAList"

const WithResult = () => {
  const num = 1500
  return (
    <div className="w-[80%] m-auto">
      <div className="text-center text-[28px] my-[30px]">
        <div>
          <span className="font-bold bg-primary/60 rounded px-3">socket</span>에
          대한
        </div>
        <div>
          총{" "}
          <span className="border-b-[2px] border-b-primary font-bold">
            {num.toLocaleString()}
          </span>
          개의 검색 결과가 있습니다.
        </div>
      </div>
      <div className="flex justify-between w-[95%] m-auto">
        <div className="flex">
          <div className="pr-[15px] border-r-[1px] border-r-slate-400 cursor-pointer hover:text-primary hover:font-bold">
            최신순
          </div>
          <div className="px-[15px] border-r-[1px] border-r-slate-400 cursor-pointer hover:text-primary hover:font-bold">
            등록순
          </div>
          <div className="px-[15px] cursor-pointer hover:text-primary hover:font-bold">
            인기순
          </div>
        </div>
        <div>
          <input type="checkbox" /> 진행 중인 QnA
        </div>
      </div>
      {/* <QnAList questions={mockQuestions} /> */}
    </div>
  )
}

export default WithResult
