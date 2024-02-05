"use client"

import {
  usePathname,
  useRouter,
  useSearchParams,
  useSelectedLayoutSegment,
} from "next/navigation"
import NavigationTab from "./NavigationTab"
import SideNavigation from "./SideNavigation"
import { matchSegmentToLayoutMetaKey } from "@/util/layoutMeta"
import { NOTMATCH_SEGMENT } from "@/constants/layoutMeta"

function Navigation() {
  const currentSegment = useSelectedLayoutSegment()
  const pathname = usePathname()
  const searchParmas = useSearchParams()

  const { replace } = useRouter()

  if (currentSegment === null && pathname === "/") {
    if (!searchParmas.get("page")) {
      const urlSearchParams = new URLSearchParams()
      urlSearchParams.set("page", "0")

      replace(`/?${urlSearchParams.toString()}`)
    }
  }

  // NotFoundPage
  if (currentSegment === NOTMATCH_SEGMENT) return null

  const matchedLayout = matchSegmentToLayoutMetaKey(
    currentSegment,
    pathname,
    searchParmas,
  )

  const hasHeader = matchedLayout.containLayout.header

  const open = matchedLayout.containLayout.navigation

  return open ? (
    <>
      <SideNavigation hasHeader={hasHeader} />
      <NavigationTab hasHeader={hasHeader} />
    </>
  ) : null
}

export default Navigation
