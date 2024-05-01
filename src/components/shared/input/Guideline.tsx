"use client"

import { useId } from "react"
import { twMerge } from "tailwind-merge"

export interface GuideLineLabelProps {
  value?: string
  valid: boolean
}

export type Guide = {
  label: string | ((props: GuideLineLabelProps) => JSX.Element)
  value?: string
  valid: boolean
}

interface GuidelineProps {
  className?: string
  open: boolean
  guildeline: Array<Guide>
}

function Guideline({ open, guildeline, className }: GuidelineProps) {
  const id = useId()
  const wrapperClassNames = twMerge(["text-xs", className])

  const itemClassNames = ({ valid }: { valid: boolean }) =>
    twMerge(["text-secondary", valid ? "text-primary" : "text-danger"])

  return open ? (
    <ul className={wrapperClassNames}>
      {guildeline.map(({ label, valid, value }, index) => {
        return (
          <li
            key={`${id}-guideline-${label}`}
            className={itemClassNames({ valid })}
          >
            {typeof label === "string"
              ? label
              : label({ valid, value: value ?? "" })}
          </li>
        )
      })}
    </ul>
  ) : null
}

export default Guideline
