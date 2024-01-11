"use client"

import Tab from "@/components/shared/tab/Tab"
import { navigationRoutes } from "@/constants/navigationRoute"
import Link from "next/link"
import { usePathname, useSelectedLayoutSegment } from "next/navigation"
import { twMerge } from "tailwind-merge"

interface NavigationTabProps {
  hasHeader: boolean
}

interface NavigationTabItemProps
  extends Pick<(typeof navigationRoutes)[0], "label" | "to"> {}

function NavigationTab({ hasHeader }: NavigationTabProps) {
  const currentSegment = useSelectedLayoutSegment()
  const pathname = usePathname()

  const wrapperClassNames = twMerge([
    "sticky w-full top-[--height-header] z-navigation py-1 bg-white sm:hidden",
    !hasHeader && "top-0",
  ])

  return (
    <nav className={wrapperClassNames}>
      <Tab
        defaultTab={
          navigationRoutes.find((route) =>
            currentSegment === null
              ? route.to === "/"
              : currentSegment === "question"
              ? route.to === "/"
              : pathname.startsWith("/profile/")
              ? undefined
              : route.to.startsWith(`/${currentSegment}`),
          )?.label
        }
        className="mt-4"
        tabs={navigationRoutes.map(({ label, to }) => {
          return {
            label,
            content: <NavigationTabItem label={label} to={to} />,
            active:
              currentSegment === null
                ? to === "/"
                : currentSegment === "question"
                ? to === "/"
                : pathname.startsWith("/profile/")
                ? false
                : to.startsWith(`/${currentSegment}`),
          }
        })}
      />
    </nav>
  )
}

function NavigationTabItem({ label, to }: NavigationTabItemProps) {
  return <Link href={to}>{label}</Link>
}

export default NavigationTab
