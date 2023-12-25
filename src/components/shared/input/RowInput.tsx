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
    "border border-colorsGray inline-flex align-top justify-between items-center rounded-lg pr-2 focus:bg-primary",
    fullWidth && "w-full",
    classNames?.wrapper,
    error && "border-danger",
  ])

  const inputClassNames = twMerge([
    "border-transparent focus:border-transparent",
    classNames?.input,
  ])

  const handleFocus = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    if (e.target.tagName === "INPUT") {
      if (wrapperRef.current && !error) {
        wrapperRef.current.style.borderColor = "#00c471"
      }
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    if (e.target.tagName === "INPUT") {
      if (wrapperRef.current) {
        wrapperRef.current.style.removeProperty("border-color")
      }
    }
  }

  return (
    <div
      className={containerClassNames}
      aria-disabled={props.disabled ? "true" : "false"}
    >
      <div
        ref={wrapperRef}
        className={wrapperClassNames}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-disabled={props.disabled ? "true" : "false"}
      >
        <div className="flex-1">
          <Input ref={ref} fullWidth className={inputClassNames} {...props} />
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
