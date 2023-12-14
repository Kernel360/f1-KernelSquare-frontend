"use client"

import Inner from "@/components/shared/Inner"
import { NOTMATCH_SEGMENT } from "@/constants/layoutMeta"
import { matchSegmentToLayoutMetaKey } from "@/util/layoutMeta"
import { useSelectedLayoutSegment } from "next/navigation"

function Footer() {
  const currentSegment = useSelectedLayoutSegment()

  // NotFoundPage
  if (currentSegment === NOTMATCH_SEGMENT) {
    return null
  }

  const matchedLayout = matchSegmentToLayoutMetaKey(currentSegment)

  const open = matchedLayout.containLayout.footer

  return open ? (
    <Inner>
      <footer>footer</footer>
    </Inner>
  ) : null
}

export default Footer
