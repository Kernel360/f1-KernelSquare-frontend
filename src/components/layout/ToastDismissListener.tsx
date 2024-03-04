"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { toast } from "react-toastify"

function ToastDismissListener() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const search = searchParams.toString()

  useEffect(() => {
    toast.dismiss()
  }, [pathname, search])

  return null
}

export default ToastDismissListener
