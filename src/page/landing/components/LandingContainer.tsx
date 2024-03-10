import type { PropsWithChildren } from "react"
import { twMerge } from "tailwind-merge"

type LandingContainerProps = {
  className?: string
} & PropsWithChildren

const LandingContainer = ({ className, children }: LandingContainerProps) => {
  const ContainerClass = twMerge([
    "w-full h-screen bg-[#303030] text-white",
    className,
  ])
  return <div className={ContainerClass}>{children}</div>
}

export default LandingContainer
