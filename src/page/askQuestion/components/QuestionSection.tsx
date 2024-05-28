import { LabelHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

interface QustionSectionProps {
  className?: string
  children: React.ReactNode
}

interface QustionSectionLabelProps
  extends LabelHTMLAttributes<HTMLLabelElement> {}

function QuestionSection({ children, className }: QustionSectionProps) {
  const classNames = twMerge(["px-0 py-6 bg-white border-none", className])

  return <section className={classNames}>{children}</section>
}

export default QuestionSection

QuestionSection.Label = function AskQustionSectionLabel({
  className,
  children,
  ...props
}: QustionSectionLabelProps) {
  const classNames = twMerge([
    "text-[#343434] text-base sm:text-xl font-bold",
    className,
  ])

  return (
    <div>
      <label className={classNames} {...props}>
        {children}
      </label>
    </div>
  )
}
