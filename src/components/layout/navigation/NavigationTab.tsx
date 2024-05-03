"use client"

import Tab from "@/components/shared/tab/Tab"
import {
  getActiveNavigationItem,
  navigationRoutes,
  profileRoute,
} from "@/constants/navigationRoute"
import { useClientSession } from "@/hooks/useClientSession"
import LinkToQnaList from "@/page/qna-detail/components/LinkToQnaList"
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
    "sticky w-full top-[--height-header] z-navigation bg-white hidden tabletDevice:block pc:hidden overflow-auto [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:h-0 border-b border-colorsGray",
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

  const isQuestionDetailPage = /^\/question\/[0-9]+$/g.test(pathname)

  return (
    <nav className={wrapperClassNames}>
      {isQuestionDetailPage ? (
        <div className="absolute left-0 top-0 h-full flex items-center text-xs [&_svg]:text-xl">
          <LinkToQnaList />
        </div>
      ) : null}
      <Tab
        defaultTab={activeNavItem?.label}
        classNames={{
          wrapper:
            "h-[59px] font-bold px-1 sm:px-4 min-w-[438px] max-w-[480px] border-b-0 mx-auto",
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
      className="flex w-full h-full justify-center items-center px-2 text-sm"
    >
      {label}
    </Link>
  )
}

export default NavigationTab
