import { HTMLAttributes, PropsWithChildren } from "react"
import { twMerge } from "tailwind-merge"

interface InnerProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {}

function Inner({ children, className, ...props }: InnerProps) {
  const classNames = twMerge(["mx-auto max-w-screen-2xl w-full", className])

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  )
}

export default Inner
