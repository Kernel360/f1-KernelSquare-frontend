import { twMerge } from "tailwind-merge"
import type {
  CodingMeetingSectionLabelProps,
  CodingMeetingSectionProps,
} from "../CreateCodingMeetingPage.types"

const CodingMeetingSection = ({
  children,
  className,
}: CodingMeetingSectionProps) => {
  const classNames = twMerge([
    "p-6 bg-white border border-colorsGray rounded-md",
    className,
  ])

  return <section className={classNames}>{children}</section>
}

CodingMeetingSection.Label = function CodingMeetingSectionLabel({
  className,
  children,
  ...props
}: CodingMeetingSectionLabelProps) {
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

export default CodingMeetingSection
