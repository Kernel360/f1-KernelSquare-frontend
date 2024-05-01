import { ForwardedRef, forwardRef, useRef } from "react"
import { Input, InputProps } from "./Input"
import { twMerge } from "tailwind-merge"

export interface RowInputProps extends Omit<InputProps, "className"> {
  sideField: React.ReactNode
  classNames?: {
    container?: string
    wrapper?: string
    input?: string
  }
}

function RowInput(
  {
    classNames,
    disabled,
    sideField,
    fullWidth,
    error,
    errorMessage,
    helpMessage,
    ...props
  }: RowInputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  const containerClassNames = twMerge([
    "inline-flex align-top flex-col max-w-full",
    fullWidth && "w-full",
    classNames?.container,
  ])

  const wrapperClassNames = twMerge([
    "border border-colorsGray inline-flex align-top justify-between items-center rounded-lg pr-2 focus-within:border-secondary",
    fullWidth && "w-full",
    classNames?.wrapper,
    error && "border-danger",
  ])

  const inputClassNames = twMerge([
    "border-transparent focus:border-transparent disabled:bg-transparent",
    classNames?.input,
  ])

  return (
    <div
      className={containerClassNames}
      aria-disabled={disabled ? "true" : "false"}
    >
      <div
        ref={wrapperRef}
        className={wrapperClassNames}
        aria-disabled={disabled ? "true" : "false"}
      >
        <div className="flex-1">
          <Input
            ref={ref}
            fullWidth
            disabled={disabled}
            className={inputClassNames}
            {...props}
          />
        </div>
        <div>{sideField}</div>
      </div>
      {!error && helpMessage ? (
        <Input.HelpMessage className="mt-1">{helpMessage}</Input.HelpMessage>
      ) : null}
      {error && errorMessage ? (
        <Input.ErrorMessage className="mt-1">{errorMessage}</Input.ErrorMessage>
      ) : null}
    </div>
  )
}

export default forwardRef(RowInput)
