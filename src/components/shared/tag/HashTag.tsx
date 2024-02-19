"use client"

import { FaHashtag } from "react-icons/fa"
import Tag from "./Tag"
import { twMerge } from "tailwind-merge"

interface HashTagProps {
  children: React.ReactNode
  className?: string
}

function HashTag({ className, children }: HashTagProps) {
  const classNames = twMerge([
    `!w-fit !inline-flex !align-top !items-center`,
    className,
  ])

  return (
    <Tag className={classNames}>
      <FaHashtag className="shrink-0 self-start mt-1" />
      {children}
    </Tag>
  )
}

export default HashTag
