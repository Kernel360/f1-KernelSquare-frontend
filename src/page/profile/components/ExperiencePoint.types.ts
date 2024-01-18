import type { PropsWithChildren } from "react"

export interface ExperiencePointProps {
  level: number
  exp: number
}

export type GraphWrapperProps = PropsWithChildren<{
  limit: number
}>
