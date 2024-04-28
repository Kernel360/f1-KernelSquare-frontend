"use client"

import { twMerge } from "tailwind-merge"
import { Icons } from "../icons/Icons"
import Button from "../shared/button/Button"
import { ButtonHTMLAttributes } from "react"

interface AlermButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  newAlerm?: boolean
  iconClassNames?: string
}

function AlermButtonUI({
  newAlerm = false,
  className,
  iconClassNames,
  ...props
}: AlermButtonProps) {
  const buttonClassNames = twMerge(["relative", className])

  const notificationIconClassNames = twMerge([
    "text-2xl transition-colors duration-200",
    newAlerm ? "text-secondary" : "text-colorsGray",
    iconClassNames,
  ])

  return (
    <Button className={buttonClassNames} {...props}>
      <Icons.Notification className={notificationIconClassNames} />
      {newAlerm ? (
        <div className="absolute top-0 -left-0.5 w-2 h-2 rounded-full bg-rose-500" />
      ) : null}
    </Button>
  )
}

export default AlermButtonUI
