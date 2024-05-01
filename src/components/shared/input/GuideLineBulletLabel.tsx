"use client"

import { twMerge } from "tailwind-merge"
import { GuideLineLabelProps } from "./Guideline"

interface GuideLinkBulletLabelProps extends GuideLineLabelProps {
  children: React.ReactNode
}

function GuideLineBulletLabel({ valid, children }: GuideLinkBulletLabelProps) {
  const wrapperClassNames = twMerge([
    "inline-flex align-top break-all gap-2",
    valid ? "text-primary" : "text-[#909090]",
  ])

  return (
    <div className={wrapperClassNames}>
      <span className="text-[26px] -mt-0.5 self-start">&bull;</span>
      {typeof children === "string" ? (
        <span className="text-xs">{children}</span>
      ) : (
        children
      )}
    </div>
  )
}

export default GuideLineBulletLabel
