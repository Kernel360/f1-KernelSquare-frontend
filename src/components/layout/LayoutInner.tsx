"use client"

import { usePathname } from "next/navigation"
import Inner from "../shared/Inner"

interface LayoutInner {
  children: React.ReactNode
}

function LayoutInner({ children }: LayoutInner) {
  const pathname = usePathname()

  const isLandingPage = pathname === "/"

  if (isLandingPage)
    return (
      <Inner className="max-w-screen-3xl w-full h-screen">{children}</Inner>
    )

  return <Inner className="flex w-full flex-col sm:flex-row">{children}</Inner>
}

export default LayoutInner
