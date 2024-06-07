"use client"

import {
  ForwardedRef,
  TextareaHTMLAttributes,
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react"
import { twMerge } from "tailwind-merge"

interface AutoResizeTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  fullWidth?: boolean
  minRows?: number
  maxRows?: number
}

function AutoResizeTextArea(
  {
    rows,
    fullWidth,
    minRows,
    maxRows,
    onChange,
    className,
    style,
    value,
    placeholder,
    disabled,
    ...props
  }: AutoResizeTextAreaProps,
  ref?: ForwardedRef<HTMLTextAreaElement>,
) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const shadowTextareaRef = useRef<HTMLTextAreaElement>(null)

  const maxHeightRef = useRef<number | null>(null)

  const textareaRows = minRows ?? rows ?? 1

  const wrapperClassNames = twMerge([
    "relative inline-flex align-top",
    fullWidth && "w-full",
  ])

  const classNames = (type: "textarea" | "shadowTextarea") =>
    twMerge([
      "box-border resize-none",
      className,
      fullWidth && "w-full",
      "overflow-hidden",
      type === "shadowTextarea" &&
        "absolute left-0 top-0 z-[-1] opacity-0 pointer-events-none h-auto",
    ])

  const getBorderStyle = () => {
    const { borderTopWidth, borderBottomWidth } = getComputedStyle(
      textareaRef.current!,
    )

    return {
      borderTop: Number(borderTopWidth.replace("px", "")),
      borderBottom: Number(borderBottomWidth.replace("px", "")),
    }
  }

  const setMaxHeight = () => {
    const { borderTop, borderBottom } = getBorderStyle()
    const computedMaxHeight = getComputedStyle(textareaRef.current!).maxHeight

    if (maxRows) {
      shadowTextareaRef.current!.rows = maxRows
      maxHeightRef.current =
        shadowTextareaRef.current!.scrollHeight + (borderTop + borderBottom)

      shadowTextareaRef.current!.rows = textareaRows

      return
    }

    if (computedMaxHeight !== "none") {
      maxHeightRef.current =
        Number(computedMaxHeight.replace("px", "")) + borderTop + borderBottom
    }
  }

  const syncHeight = () => {
    shadowTextareaRef.current!.value = textareaRef.current!.value

    const { borderTop, borderBottom } = getBorderStyle()

    const shadowHeight =
      shadowTextareaRef.current!.scrollHeight + borderTop + borderBottom

    if (maxHeightRef.current) {
      const overflow = shadowHeight >= maxHeightRef.current

      textareaRef.current!.style.height = overflow
        ? maxHeightRef.current + "px"
        : shadowHeight + "px"

      if (overflow) {
        textareaRef.current!.style.overflow = "auto"
        shadowTextareaRef.current!.style.overflow = "auto"

        return
      }

      textareaRef.current!.style.removeProperty("overflow")
      shadowTextareaRef.current!.style.removeProperty("overflow")

      return
    }

    textareaRef.current!.style.height = shadowHeight + "px"
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    syncHeight()

    onChange && onChange(e)
  }

  useImperativeHandle(ref, () => textareaRef.current!, [])

  useLayoutEffect(() => {
    if (
      (!value || !textareaRef.current?.value) &&
      shadowTextareaRef.current?.value
    ) {
      syncHeight()
    }
  }, [value]) /* eslint-disable-line */

  useLayoutEffect(() => {
    setMaxHeight()

    syncHeight()
  }, []) /* eslint-disable-line */

  return (
    <div className={wrapperClassNames}>
      {/* textarea */}
      <textarea
        ref={textareaRef}
        placeholder={placeholder}
        disabled={disabled}
        className={classNames("textarea")}
        style={style}
        value={value}
        onChange={handleChange}
        {...props}
      />
      {/* hidden textarea */}
      <textarea
        ref={shadowTextareaRef}
        aria-hidden={"true"}
        placeholder={placeholder}
        disabled={disabled}
        rows={textareaRows}
        className={classNames("shadowTextarea")}
        style={style}
      />
    </div>
  )
}

export default forwardRef<HTMLTextAreaElement, AutoResizeTextAreaProps>(
  AutoResizeTextArea,
)
