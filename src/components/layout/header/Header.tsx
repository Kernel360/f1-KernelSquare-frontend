"use client"

import Inner from "@/components/shared/Inner"
import { matchSegmentToLayoutMetaKey } from "@/util/layoutMeta"
import Link from "next/link"
import {
  usePathname,
  useSearchParams,
  useSelectedLayoutSegment,
} from "next/navigation"
import LogoWithRowText from "@/components/icons/LogoWithRowText"
import MobileArea from "./area/mobileArea"
import Area from "./area"
import { twMerge } from "tailwind-merge"
import { pathnameOfBack } from "@/util/historySession/path"
import LinkToListPage from "@/components/LinkToListPage"

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

  const targetPage = pathnameOfBack(pathname)

  const logoClassNames = twMerge([
    targetPage
      ? "pointer-events-none absolute left-0 top-0 w-full h-full flex justify-center items-center sm:pointer-events-auto sm:static sm:left-[unset] sm:top-[unset] sm:w-auto"
      : "flex justify-center items-center",
  ])

  return open ? (
    <header className="bg-white h-16 p-2 sticky top-0 border-b border-b-colorsGray z-header">
      <Inner className="flex justify-between items-center h-full">
        {targetPage ? (
          <div className="block sm:hidden [&_span]:hidden [&_svg]:text-xl">
            <LinkToListPage to={targetPage} />
          </div>
        ) : null}
        {/* logo - click: move Home */}
        <div className={logoClassNames}>
          <Link href={"/"} className="pointer-events-auto">
            <LogoWithRowText />
            <h2 className="sr-only">kernel square</h2>
          </Link>
        </div>
        <Area />
        <MobileArea />
      </Inner>
    </header>
  ) : null
}

export default Header
