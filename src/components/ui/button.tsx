import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { twMerge } from "tailwind-merge"

const buttonVariants = cva(
  "inline-flex px-2 py-1 rounded-lg font-bold text-sm h-fit justify-center items-center transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/90",
        secondary: "bg-secondary text-white hover:bg-secondary/80",
        third:
          "text-black border-[1px] border-primary hover:bg-primary hover:text-white",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      ghost: {
        // 기본은 ghost 모드 해제
        default: "",
        primary:
          "text-white hover:bg-primary hover:bg-transparent hover:text-accent-foreground",
        secondary:
          "text-secondary hover:text-white hover:bg-secondary hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  fullWidth?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, ghost, fullWidth, asChild = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button"
    const buttonClass = twMerge(
      cn(buttonVariants({ variant, size, className, ghost })),
      // 기존 버튼과 동일하게 fullWidth 적용 가능
      [fullWidth && "w-full"],
    )
    return <Comp className={buttonClass} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
