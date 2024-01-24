"use client"

import { FaHashtag } from "react-icons/fa"
import Tag from "./Tag"

interface HashTagProps {
  children: React.ReactNode
}

function HashTag({ children }: HashTagProps) {
  return (
    <Tag className="!w-fit !inline-flex !align-top !items-center">
      <FaHashtag className="shrink-0 self-start mt-1" />
      {children}
    </Tag>
  )
}

export default HashTag
