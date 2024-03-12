"use client"

import { twMerge } from "tailwind-merge"

interface ExternalValidation {
  valid: boolean
  render?: React.ReactNode
}

interface TextCounterProps {
  text: string
  min: number
  max: number
  className?: string
  target?: boolean
  externalValidations?: Array<ExternalValidation>
}

function TextCounter({
  text,
  min,
  max,
  className,
  target = true,
  externalValidations,
}: TextCounterProps) {
  const isValidRange = text.length >= min && text.length <= max
  const targetExternalValid =
    externalValidations && externalValidations.length
      ? findTriggerExternalValidation(externalValidations) ?? null
      : null

  const classNames = twMerge([
    "inline-block align-top text-secondary font-semibold text-sm",
    className,
  ])

  if (!target) return null

  return (
    <div className={classNames}>
      <>&#40;&nbsp;</>
      <span
        className={
          isValidRange && !targetExternalValid
            ? "!text-primary"
            : "!text-danger"
        }
      >
        {text.length}
      </span>
      <span> / </span>
      <span>{max}</span>
      <>&#41;&nbsp;</>
      {targetExternalValid ? <>{targetExternalValid.render}</> : null}
    </div>
  )
}

export default TextCounter

function findTriggerExternalValidation(validations: Array<ExternalValidation>) {
  return validations.find(({ valid }) => !valid)
}
