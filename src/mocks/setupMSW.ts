import { SetupWorker } from "msw/browser"
import { SetupServer } from "msw/node"

let mswServer: SetupServer | null = null
let mswClient: SetupWorker | null = null

// MSW server
export function setupMSWServer() {
  if (
    process.env.NEXT_PUBLIC_API_MOCKING === "enabled" &&
    typeof window === "undefined" &&
    !mswServer
  ) {
    console.log("[MSW - Server] Mocking enabled.")

    const { server } = require("@/mocks/server")

    mswServer = server
    server.listen({ onUnhandledRequest: "bypass" })
  }

  return mswServer
}

// MSW client
export function setupMSWClient() {
  if (
    process.env.NEXT_PUBLIC_API_MOCKING === "enabled" &&
    typeof window !== "undefined" &&
    !mswClient
  ) {
    const { worker } = require("@/mocks/browser")

    mswClient = worker
    worker.start({ onUnhandledRequest: "bypass" })
  }

  return mswClient
}
