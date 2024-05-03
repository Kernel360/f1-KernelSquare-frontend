import { ButtonHTMLAttributes } from "react"
import Button from "../button/Button"
import { twMerge } from "tailwind-merge"

interface TagProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  wrapperClassName?: string
}

function Tag({ children, wrapperClassName, className, ...props }: TagProps) {
  const wrapperClassNames = twMerge([
    "inline text-left leading-[30px] p-0",
    wrapperClassName,
  ])

  const contentClassNames = twMerge([
    "transition-colors cursor-default break-all bg-colorsLightGray px-2 py-1 rounded-lg text-sm text-secondary font-semibold shadow-sm",
    className,
  ])

  return (
    <Button className={wrapperClassNames} {...props}>
      <span className={contentClassNames}>{children}</span>
    </Button>
  )
}

export default Tag
