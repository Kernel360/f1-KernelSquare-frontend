"use client"

import { setupMSWClient } from "@/mocks/setupMSW"

function MSWClient() {
  if (
    process.env.NEXT_PUBLIC_API_MOCKING === "enabled" &&
    typeof window !== "undefined"
  ) {
    setupMSWClient()
  }

  return null
}

export default MSWClient
