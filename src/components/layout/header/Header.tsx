"use client"

import Inner from "@/components/shared/Inner"
import { matchSegmentToLayoutMetaKey } from "@/util/layoutMeta"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import SearchArea from "./search/SearchArea"
import Skeleton from "react-loading-skeleton"
import dynamic from "next/dynamic"
// import UserArea from "./UserArea"

const UserArea = dynamic(() => import("./UserArea"), {
  ssr: false,
  loading(loadingProps) {
    return <Skeleton width={128} height={28} />
  },
})

function Header() {
  const currentSegment = useSelectedLayoutSegment()

  const matchedLayout = matchSegmentToLayoutMetaKey(currentSegment)

  const open = matchedLayout ? matchedLayout.containLayout.header : true

  return open ? (
    <header className="bg-white h-16 p-2 sticky top-0 shadow-[0_2px_4px_0_hsla(0,0%,80.8%,.5)] z-header">
      <Inner className="flex justify-between items-center h-full">
        {/* logo - click: move Home */}
        <Link href={"/"}>KernalSquare</Link>
        {/* search */}
        <SearchArea />
        {/* userArea */}
        <UserArea />
      </Inner>
    </header>
  ) : null
}

export default Header
