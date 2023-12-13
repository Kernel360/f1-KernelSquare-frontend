import { setupMSWServer } from "@/mocks/setupMSW"

async function MSWServer() {
  if (
    process.env.NEXT_PUBLIC_API_MOCKING === "enabled" &&
    typeof window === "undefined"
  ) {
    setupMSWServer()
  }

  return null
}

export default MSWServer
