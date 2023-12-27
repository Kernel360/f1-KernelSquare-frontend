"use client"

import { InputHTMLAttributes, forwardRef } from "react"
import { twMerge } from "tailwind-merge"

export interface TextareaProps
  extends InputHTMLAttributes<HTMLTextAreaElement> {
  fullWidth?: boolean
  rows?: number
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, fullWidth = false, rows, ...props }, ref) => {
    const wrapperClassNames = twMerge([
      "flex-col align-top",
      fullWidth && "w-full",
    ])

    const classNames = twMerge([
      "p-2 outline-none rounded-lg border border-colorsGray placeholder:text-colorsGray placeholder:text-sm focus:border-primary",
      fullWidth && "w-full",
      className,
    ])

    return (
      <div className={wrapperClassNames}>
        <textarea ref={ref} className={classNames} rows={rows} {...props} />
      </div>
    )
  },
)

Textarea.displayName = "Textarea"

export default Textarea
