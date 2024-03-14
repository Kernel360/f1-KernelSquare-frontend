"use client"

import Inner from "@/components/shared/Inner"
import { NOTMATCH_SEGMENT } from "@/constants/layoutMeta"
import { matchSegmentToLayoutMetaKey } from "@/util/layoutMeta"
import {
  usePathname,
  useSearchParams,
  useSelectedLayoutSegment,
} from "next/navigation"

function Footer() {
  const currentSegment = useSelectedLayoutSegment()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // NotFoundPage
  if (currentSegment === NOTMATCH_SEGMENT) {
    return null
  }

  const matchedLayout = matchSegmentToLayoutMetaKey(
    currentSegment,
    pathname,
    searchParams,
  )

  const open = matchedLayout.containLayout.footer

  return open ? (
    <Inner>
      <footer>
        <div className="w-full h-10 bg-transparent bg-[#303030] text-white text-center">
          © 2024. Kernel Square. All rights reserved.
        </div>
      </footer>
    </Inner>
  ) : null
}

export default Footer
