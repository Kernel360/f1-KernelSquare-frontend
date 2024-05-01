"use client"

import { updateHistorySessionPath } from "@/util/historySession/path"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

function HistorySession() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    updateHistorySessionPath()
  }, [pathname, searchParams])

  return null
}

export default HistorySession
