"use client"

import { twMerge } from "tailwind-merge"

interface TextCounterProps {
  text: string
  min: number
  max: number
  className?: string
  target?: boolean
}

function TextCounter({
  text,
  min,
  max,
  className,
  target = true,
}: TextCounterProps) {
  const isValidRange = text.length >= min && text.length <= max

  const classNames = twMerge([
    "inline-block align-top text-secondary font-semibold text-sm",
    className,
  ])

  if (!target) return null

  return (
    <div className={classNames}>
      &#40;&nbsp;
      <span className={isValidRange ? "!text-primary" : "!text-danger"}>
        {text.length}
      </span>
      <span> / </span>
      <span>{max}</span>
      &#41;&nbsp;
    </div>
  )
}

export default TextCounter
