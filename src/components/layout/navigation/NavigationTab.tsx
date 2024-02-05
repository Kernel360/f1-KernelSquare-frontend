"use client"

import Tab from "@/components/shared/tab/Tab"
import {
  getActiveNavigationItem,
  navigationRoutes,
  profileRoute,
} from "@/constants/navigationRoute"
import { useClientSession } from "@/hooks/useClientSession"
import Link from "next/link"
import {
  useParams,
  usePathname,
  useSelectedLayoutSegment,
} from "next/navigation"
import { twMerge } from "tailwind-merge"

interface NavigationTabProps {
  hasHeader: boolean
}

interface NavigationTabItemProps
  extends Pick<(typeof navigationRoutes)[0], "label" | "to"> {}

function NavigationTab({ hasHeader }: NavigationTabProps) {
  const currentSegment = useSelectedLayoutSegment()
  const pathname = usePathname()
  const params = useParams()

  const wrapperClassNames = twMerge([
    "sticky w-full top-[--height-header] z-navigation py-1 bg-white sm:hidden",
    !hasHeader && "top-0",
  ])

  const { user } = useClientSession()

  const activeNavItem = getActiveNavigationItem({
    segment: currentSegment,
    pathname,
  })

  const navigationRouteTabs = navigationRoutes.map(({ label, to }) => {
    return {
      label,
      content: <NavigationTabItem label={label} to={to} />,
      active: activeNavItem ? activeNavItem.label === label : false,
    }
  })

  const profileRouteTabs = user
    ? profileRoute.map(({ label, to }) => {
        const isMyPage =
          pathname.includes("profile") && Number(params.id) === user?.member_id

        return {
          label,
          content: (
            <NavigationTabItem label={label} to={to + `/${user.member_id}`} />
          ),
          active: isMyPage,
        }
      })
    : []

  const renderTabs = [...navigationRouteTabs, ...profileRouteTabs]

  return (
    <nav className={wrapperClassNames}>
      <Tab
        defaultTab={activeNavItem?.label}
        classNames={{
          wrapper: "h-[59px] font-bold px-4",
        }}
        activeClassNames={{
          tab: "text-secondary",
          gutter: "bg-secondary",
        }}
        tabs={renderTabs}
      />
    </nav>
  )
}

function NavigationTabItem({ label, to }: NavigationTabItemProps) {
  return (
    <Link
      href={to}
      className="flex w-full h-full justify-center items-center px-2"
    >
      {label}
    </Link>
  )
}

export default NavigationTab
