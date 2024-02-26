import { twMerge } from "tailwind-merge"
import type {
  CodingMeetingSectionLabelProps,
  CodingMeetingSectionProps,
} from "../CreateCodingMeetingPage.types"

const CodingMeetingSection = ({
  children,
  className,
}: CodingMeetingSectionProps) => {
  const classNames = twMerge(["p-6 bg-white flex w-full", className])

  return <section className={classNames}>{children}</section>
}

CodingMeetingSection.Label = function CodingMeetingSectionLabel({
  className,
  children,
  ...props
}: CodingMeetingSectionLabelProps) {
  const classNames = twMerge([
    className,
    "w-[100px] mr-10 text-colorsDarkGray text-lg font-bold",
  ])

  return (
    <label className={classNames} {...props}>
      {children}
    </label>
  )
}

export default CodingMeetingSection
