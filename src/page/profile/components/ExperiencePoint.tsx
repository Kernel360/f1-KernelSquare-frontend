"use client"

import levelStandard from "@/constants/levelStandard"
import { PropsWithChildren } from "react"
import { twJoin } from "tailwind-merge"

interface ExperienceProps {
  level: number
  exp: number
}

function ExperiencePoint({ level, exp }: ExperienceProps) {
  const limit = levelStandard[level]
  const length = (exp / limit) * 100
  const dynamic_width = twJoin([
    `absolute top-0 z-5 bg-primary rounded-md h-[25px] text-white text-center`,
    length === 0 && "hidden",
  ])
  return (
    <GraphWrapper limit={levelStandard[level]}>
      <div className="relative w-[90%] mx-[10px]">
        <div className="z-0 bg-gray-300 rounded-md h-[25px] "></div>
        <div className={dynamic_width} style={{ width: `${length}%` }}>
          {exp}
        </div>
      </div>
    </GraphWrapper>
  )
}

export default ExperiencePoint

type WrapperProps = PropsWithChildren<{
  limit: number
}>

const GraphWrapper = ({ limit, children }: WrapperProps) => {
  return (
    <div className="mb-[50px]">
      <div className="font-bold text-lg mb-[20px]">경험치</div>
      <div className="w-full flex">
        <div className="w-4/24 text-center mr-4">0</div>
        <div className="m-auto w-full text-center flex justify-center">
          {children}
        </div>
        <div className="w-4/24 text-center ml-4">{limit}</div>
      </div>
    </div>
  )
}
