import { LabelHTMLAttributes, PropsWithChildren } from "react"
import { twMerge } from "tailwind-merge"

interface AskQustionSectionProps extends NonNullable<PropsWithChildren> {
  className?: string
}

interface AskQustionSectionLabelProps
  extends LabelHTMLAttributes<HTMLLabelElement> {}

function AskQuestionSection({ children, className }: AskQustionSectionProps) {
  const classNames = twMerge([
    "p-6 bg-white border border-colorsGray rounded-md",
    className,
  ])

  return <section className={classNames}>{children}</section>
}

AskQuestionSection.Label = function AskQustionSectionLabel({
  className,
  children,
  ...props
}: AskQustionSectionLabelProps) {
  const classNames = twMerge([
    className,
    "text-colorsDarkGray text-lg font-bold",
  ])

  return (
    <div>
      <label className={classNames} {...props}>
        {children}
      </label>
    </div>
  )
}

export default AskQuestionSection
