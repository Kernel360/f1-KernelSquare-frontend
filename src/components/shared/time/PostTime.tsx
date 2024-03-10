"use client"

import { twMerge } from "tailwind-merge"

interface PostTimeProps {
  label?: React.ReactNode
  time: string
  withColon?: boolean
  withSpace?: boolean
  className?: string
}

function PostTime({
  label = null,
  time,
  withColon = false,
  withSpace = false,
  className,
}: PostTimeProps) {
  const classNames = twMerge([
    "inline-flex align-top items-center text-[#828282] text-sm flex-shrink-0",
    className,
  ])

  return (
    <div className={classNames}>
      {label}
      {withSpace ? <>&nbsp;</> : null}
      {withColon ? <>:</> : null}
      {withSpace ? <>&nbsp;</> : null}
      {time}
    </div>
  )
}

export default PostTime
