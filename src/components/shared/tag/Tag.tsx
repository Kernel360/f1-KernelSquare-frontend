import { ButtonHTMLAttributes } from "react"
import Button from "../button/Button"
import { twMerge } from "tailwind-merge"

interface TagProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

function Tag({ children, className, ...props }: TagProps) {
  const contentClassNames = twMerge([
    "transition-colors cursor-pointer break-all bg-colorsLightGray hover:bg-colorsGray px-2 py-1 rounded-lg text-sm text-secondary font-semibold shadow-sm",
    className,
  ])

  return (
    <Button className={"inline text-left leading-[30px] p-0"} {...props}>
      <span className={contentClassNames}>{children}</span>
    </Button>
  )
}

export default Tag
