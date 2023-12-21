import { setupServer } from "msw/node"
import { mswHandler } from "./handler"

export const server = setupServer(...mswHandler)
