"use client"

import { ButtonHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

type ButtonColorTheme = "primary" | "secondary" | "third"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonTheme?: ButtonColorTheme
  ghost?: boolean
  fullWidth?: boolean
}

function Button({
  children,
  className,
  type,
  ghost,
  buttonTheme,
  fullWidth,
  ...props
}: ButtonProps) {
  const bgThemeClassNames = twMerge([
    buttonTheme === "primary" &&
      (ghost
        ? "text-primary hover:border-[1px] hover:border-primary"
        : "text-white bg-primary hover:bg-[#02a35f]"),
    buttonTheme === "secondary" &&
      (ghost
        ? "text-secondary hover:text-white hover:bg-secondary"
        : "text-white bg-secondary hover:bg-[#464e57]"),
    buttonTheme === "third" &&
      "text-black border-[1px] border-primary hover:bg-light-green hover:border-light-green hover:text-secondary",
    ghost && "bg-transparent",
  ])

  const classNames = twMerge([
    "inline-flex px-2 py-1 rounded-lg font-bold text-sm h-fit justify-center items-center transition-colors",
    fullWidth && "w-full",
    bgThemeClassNames,
    className,
  ])

  return (
    <button type={type ?? "button"} className={classNames + ""} {...props}>
      {children}
    </button>
  )
}

export default Button
