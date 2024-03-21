"use client"

import * as Sentry from "@sentry/nextjs"
import Error from "next/error"
import { useEffect } from "react"

export default function GlobalError({ error }) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SENTRY_ACTIVE === "enabled") {
      Sentry.captureException(error)
    }
  }, [error])

  return (
    <html>
      <body>
        <Error />
      </body>
    </html>
  )
}
