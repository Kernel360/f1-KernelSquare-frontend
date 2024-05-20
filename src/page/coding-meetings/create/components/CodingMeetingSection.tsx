import { twMerge } from "tailwind-merge"

interface CodingMeetingSectionProps {
  children: React.ReactNode
  className?: string
}

interface CodingMeetingSectionLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  verticalAlign?: "top" | "center"
}

const CodingMeetingSection = ({
  children,
  className,
}: CodingMeetingSectionProps) => {
  const classNames = twMerge([
    "bg-white flex w-full flex-col gap-y-2 gap-x-4 pc:flex-row",
    className,
  ])

  return <section className={classNames}>{children}</section>
}

export default CodingMeetingSection

CodingMeetingSection.Label = function CodingMeetingSectionLabel({
  verticalAlign = "top",
  className,
  children,
  ...props
}: CodingMeetingSectionLabelProps) {
  const classNames = twMerge([
    verticalAlign === "top" && "items-start",
    verticalAlign === "center" && "items-center",
    "h-fit",
    className,
    "w-fit flex shrink-0 pc:w-[122px] text-[#828282] text-base font-bold",
  ])

  return (
    <label className={classNames} {...props}>
      {children}
    </label>
  )
}
