"use client"

import { twMerge } from "tailwind-merge"

interface TextLengthIndicatorProps {
  text?: string
  isEditTarget: boolean
  classNames?: {
    wrapper: string
  }
}

function TextLengthIndicator({
  text,
  isEditTarget,
  classNames,
}: TextLengthIndicatorProps) {
  const isValidLength = text ? text.length >= 10 && text.length <= 10000 : false

  const wrapperClassNames = twMerge([classNames?.wrapper])

  const targetTextClassNames = twMerge([
    "font-semibold text-sm",
    isValidLength ? "text-primary" : "text-danger",
  ])

  if (!isEditTarget) return null

  return (
    <div className={wrapperClassNames}>
      &#40;&nbsp;
      <span className={targetTextClassNames}>{text?.length ?? 0}</span>
      <span className="font-semibold text-sm">&nbsp;/&nbsp;</span>
      <span className="font-semibold text-black text-sm">10000</span>
      &nbsp;&#41;
    </div>
  )
}

export default TextLengthIndicator
