"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

function ScrollTop() {
  const path = usePathname()

  useEffect(() => {
    window.scroll({ top: 0 })
  }, [path])

  return null
}

export default ScrollTop
