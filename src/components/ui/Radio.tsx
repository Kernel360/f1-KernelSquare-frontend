"use client"

import { ForwardedRef, HTMLAttributes, HTMLProps, forwardRef } from "react"
import { twJoin, twMerge } from "tailwind-merge"

interface RadioProps extends HTMLProps<HTMLInputElement> {
  theme?: "primary" | "secondary" | "danger"
}

function Radio(
  { className, theme = "primary", ...props }: RadioProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const nonCheckedClassNames = twJoin(["after:bg-transparent after:opacity-0"])

  const checkedClassNames = twMerge([
    "after:opacity-100",
    theme === "primary" && "after:checked:bg-primary",
    theme === "secondary" && "after:checked:bg-secondary",
    theme === "danger" && "after:checked:bg-danger",
  ])

  const radioClassNames = twMerge([
    "relative inline-flex align-top w-4 h-4 border rounded-full bg-white after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-1/2 after:h-1/2 after:rounded-full after:transition-colors",
    nonCheckedClassNames,
    checkedClassNames,
    className,
    "appearance-none",
  ])

  return <input ref={ref} type="radio" className={radioClassNames} {...props} />
}

export default forwardRef<HTMLInputElement, RadioProps>(Radio)
