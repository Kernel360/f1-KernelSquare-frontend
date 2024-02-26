import type { LabelHTMLAttributes, PropsWithChildren } from "react"

export interface CodingMeetingFormData {
  title: string
}

export type SubmitAskQuestionData = CodingMeetingFormData

export type SubmitUpdateCodingMeetingData = Omit<
  SubmitAskQuestionData,
  "member_id"
> & { post_id: number }

export const enum TimeZone {
  AM = "AM",
  PM = "PM",
}

export interface CodingMeetingSectionProps
  extends NonNullable<PropsWithChildren> {
  className?: string
}

export interface CodingMeetingSectionLabelProps
  extends LabelHTMLAttributes<HTMLLabelElement> {}

export type TimeOptionsProps = { date: string[] }
