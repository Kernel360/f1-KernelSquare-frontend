import { twMerge } from "tailwind-merge"

export interface CoffeeChatSectionProps {
  className?: string
  children: React.ReactNode
}

export interface CoffeeChatSectionLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const CoffeeChatSection = ({ children, className }: CoffeeChatSectionProps) => {
  const classNames = twMerge([
    "p-6 bg-white border border-colorsGray rounded-md",
    className,
  ])

  return <section className={classNames}>{children}</section>
}

CoffeeChatSection.Label = function CoffeeChatSectionLabel({
  className,
  children,
  ...props
}: CoffeeChatSectionLabelProps) {
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

export default CoffeeChatSection
