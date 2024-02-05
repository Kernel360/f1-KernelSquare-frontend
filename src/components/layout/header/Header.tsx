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
import Logo from "@/components/icons/Logo"

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
        <Link href={"/"} className="flex gap-[2px] justify-center items-center">
          <Logo className="text-[40px]" />
          <span className="text-xs text-secondary font-bold w-max">
            커널스퀘어
          </span>
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
