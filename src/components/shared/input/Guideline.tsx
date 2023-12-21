import { twMerge } from "tailwind-merge"

type Guide = {
  label: string
  valid: boolean
}

interface GuidelineProps {
  className?: string
  open: boolean
  guildeline: Array<Guide>
}

function Guideline({ open, guildeline, className }: GuidelineProps) {
  const wrapperClassNames = twMerge(["text-xs", className])

  const itemClassNames = ({ valid }: { valid: boolean }) =>
    twMerge(["text-secondary", valid ? "text-primary" : "text-danger"])

  return open ? (
    <ul className={wrapperClassNames}>
      {guildeline.map(({ label, valid }) => {
        return (
          <li key={`guideline-${label}`} className={itemClassNames({ valid })}>
            {label}
          </li>
        )
      })}
    </ul>
  ) : null
}

export default Guideline
