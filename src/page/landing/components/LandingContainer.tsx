import { forwardRef } from "react"
import type { PropsWithChildren, ForwardedRef } from "react"
import { twMerge } from "tailwind-merge"

type LandingContainerProps = {
  className?: string
} & PropsWithChildren

const LandingContainer = forwardRef(
  (
    { className, children }: LandingContainerProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const ContainerClass = twMerge([
      "w-full h-screen bg-[#303030] text-white",
      className,
    ])
    return (
      <div ref={ref} className={ContainerClass}>
        {children}
      </div>
    )
  },
)

LandingContainer.displayName = "LandingContainer"

export default LandingContainer
