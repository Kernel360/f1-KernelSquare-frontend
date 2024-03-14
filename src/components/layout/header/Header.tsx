"use client"

import Inner from "@/components/shared/Inner"
import { matchSegmentToLayoutMetaKey } from "@/util/layoutMeta"
import Link from "next/link"
import {
  usePathname,
  useSearchParams,
  useSelectedLayoutSegment,
} from "next/navigation"
import SearchArea from "./search/SearchArea"
import UserArea from "./UserArea"
import LogoWithRowText from "@/components/icons/LogoWithRowText"

function Header() {
  const currentSegment = useSelectedLayoutSegment()
  const pathname = usePathname()
  const searchParmas = useSearchParams()

  const matchedLayout = matchSegmentToLayoutMetaKey(
    currentSegment,
    pathname,
    searchParmas,
  )

  const open = matchedLayout ? matchedLayout.containLayout.header : true

  return open ? (
    <header className="bg-white h-16 p-2 sticky top-0 shadow-[0_2px_4px_0_hsla(0,0%,80.8%,.5)] z-header">
      <Inner className="flex justify-between items-center h-full">
        {/* logo - click: move Home */}
        <Link href={"/"} className="flex justify-center items-center">
          <LogoWithRowText />
          <h2 className="sr-only">kernel square</h2>
        </Link>
        {/* search */}
        <SearchArea />
        {/* userArea */}
        <UserArea />
      </Inner>
    </header>
  ) : null
}

export default Header
