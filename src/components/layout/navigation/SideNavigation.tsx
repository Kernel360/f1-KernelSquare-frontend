"use client"

import { Icon } from "@/components/icons/Icons"
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

interface SideNavigationProps {
  hasHeader: boolean
}

interface SideNavigationItemProps {
  label: string
  active: boolean
  activeClassName: string
  icon: Icon
  to: string
}

function SideNavigation({ hasHeader }: SideNavigationProps) {
  const currentSegment = useSelectedLayoutSegment()
  const pathname = usePathname()
  const params = useParams()

  const wrapperClassNames = twMerge([
    "hidden pc:sticky pc:inline-flex pc:border-r pc:border-[#E7E7E7] pc:w-[200px] pc:align-top pc:top-[--height-header] pc:bg-white pc:h-[calc(100vh-var(--height-header))] pc:z-navigation",
    !hasHeader && "sm:top-0 sm:h-screen",
  ])

  const { user } = useClientSession()
  const isMyPage =
    pathname.includes("profile") && Number(params.id) === user?.member_id

  const activeNavItem = getActiveNavigationItem({
    segment: currentSegment,
    pathname,
  })

  return (
    <aside className={wrapperClassNames}>
      <nav className={"w-full box-border px-2 py-6"}>
        <ul className="flex flex-col gap-4">
          {navigationRoutes.map(({ label, icon, to, activeClassName }) => {
            const active = activeNavItem ? activeNavItem.label === label : false

            return (
              <li key={label}>
                <SideNavigationItem
                  label={label}
                  icon={icon}
                  active={active}
                  activeClassName={activeClassName}
                  to={to}
                />
              </li>
            )
          })}
          {!!user &&
            profileRoute.map(({ label, icon, to, activeClassName }) => {
              return (
                <li key={label}>
                  <SideNavigationItem
                    label={label}
                    icon={icon}
                    active={isMyPage}
                    activeClassName={activeClassName}
                    to={to + `/${user.member_id}`}
                  />
                </li>
              )
            })}
        </ul>
      </nav>
    </aside>
  )
}

function SideNavigationItem({
  label,
  active,
  icon,
  to,
  activeClassName,
}: SideNavigationItemProps) {
  const Icon = icon

  const iconClassNames = twMerge([
    "text-colorsDarkGray text-xl",
    active && activeClassName,
  ])

  const textClassNames = twMerge([
    "text-colorsGray text-base font-semibold",
    active && "text-secondary",
  ])

  return (
    <Link href={to} className="flex gap-2 items-center">
      <Icon className={iconClassNames} />
      <span className={textClassNames}>{label}</span>
    </Link>
  )
}

export default SideNavigation
