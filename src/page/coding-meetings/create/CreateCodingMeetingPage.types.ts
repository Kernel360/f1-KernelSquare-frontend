import type {
  CodingMeetingDateTime,
  CodingMeetingHashTags,
  CodingMeetingLocation,
} from "@/interfaces/coding-meetings"
import type { Time } from "@/recoil/atoms/coding-meeting/dateTime"
import type { LabelHTMLAttributes, PropsWithChildren } from "react"
import { SetterOrUpdater } from "recoil"

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

export type HeadCountSectionProps = {
  initialCnt?: string
}

export type HashTagsSectionProps = {
  initialHashTags?: CodingMeetingHashTags
}

export type DateTimeSectionProps = {
  initialDateTime?: CodingMeetingDateTime
}

export type LocationSectionProps = {
  initialLocation?: CodingMeetingLocation
}

export type TimeBoxProps = {
  timeState: Time
  setTimeState: SetterOrUpdater<Time>
  suffix: "부터" | "까지"
}

export type SelectBoxProps = {
  targetArray: string[]
  placeholder: "구분" | "시간" | "분"
  handler: (value: string) => void
  defaultValue?: string
}
