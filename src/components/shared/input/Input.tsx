"use client"

import { HTMLAttributes, InputHTMLAttributes, forwardRef } from "react"
import { twMerge } from "tailwind-merge"

interface CompoundInput
  extends React.ForwardRefExoticComponent<
    InputProps & React.RefAttributes<HTMLDivElement>
  > {
  ErrorMessage: typeof ErrorMessage
  HelpMessage: typeof HelpMessage
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean
  error?: boolean
  errorMessage?: string
  helpMessage?: string
  wrapperClassName?: string
}

interface InputErrorMessageProps extends HTMLAttributes<HTMLSpanElement> {}

const forwardInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      wrapperClassName,
      fullWidth = false,
      error = false,
      errorMessage,
      helpMessage,
      ...props
    },
    ref,
  ) => {
    const wrapperClassNames = twMerge([
      "inline-flex flex-col align-top",
      fullWidth && "w-full",
      wrapperClassName,
    ])

    const classNames = twMerge([
      "p-2 outline-none rounded-lg border border-colorsGray placeholder:text-colorsGray placeholder:text-sm focus:border-primary",
      fullWidth && "w-full",
      className,
      error && "border-danger focus:border-danger",
    ])

    return (
      <div className={wrapperClassNames}>
        <input ref={ref} className={classNames} {...props} />
        {!error && helpMessage ? (
          <HelpMessage>{helpMessage}</HelpMessage>
        ) : null}
        {error && errorMessage ? (
          <ErrorMessage className="w-full mt-1">{errorMessage}</ErrorMessage>
        ) : null}
      </div>
    )
  },
)

forwardInput.displayName = "Input"

function HelpMessage({
  children,
  className,
  ...props
}: InputErrorMessageProps) {
  const classNames = twMerge([
    "inline-block align-top break-all text-colorsGray text-xs",
    className,
  ])

  return (
    <span className={classNames} {...props}>
      {children}
    </span>
  )
}

function ErrorMessage({
  children,
  className,
  ...props
}: InputErrorMessageProps) {
  const classNames = twMerge([
    "inline-block align-top break-all text-danger text-xs",
    className,
  ])

  return (
    <span className={classNames} {...props}>
      {children}
    </span>
  )
}

export const Input = {
  ...forwardInput,
  ErrorMessage,
  HelpMessage,
} as CompoundInput
