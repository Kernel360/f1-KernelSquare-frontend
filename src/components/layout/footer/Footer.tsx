"use client"

import Inner from "@/components/shared/Inner"
import { layoutMeta } from "@/constants/layoutMeta"
import { matchLayoutMetaKey } from "@/util/layoutMeta"
import { usePathname } from "next/navigation"

function Footer() {
  const currentPath = usePathname()

  const pathKey = matchLayoutMetaKey(currentPath)

  return layoutMeta[pathKey]?.containLayout.footer ? (
    <Inner>
      <footer>footer</footer>
    </Inner>
  ) : null
}

export default Footer
