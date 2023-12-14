import { setupWorker } from "msw/browser"
import { mswHandler } from "./handler"

export const worker = setupWorker(...mswHandler)
