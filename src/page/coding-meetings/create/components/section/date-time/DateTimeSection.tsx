"use client"

import Spacing from "@/components/shared/Spacing"
import CodingMeetingSection from "../../CodingMeetingSection"
import CreateCodingMeetingCalendar from "../../calendar/CreateCodingMeetingCalendar"
import CodingMeetingEndHourController from "../../../controls/end-time/CodingMeetingEndHourController"
import CodingMeetingEndMinuteController from "../../../controls/end-time/CodingMeetingEndMinuteController"
import CodingMeetingStartHourController from "../../../controls/start-time/CodingMeetingStartHourController"
import CodingMeetingStartMinuteController from "../../../controls/start-time/CodingMeetingStartMinuteController"
import { CodingMeetingFormData } from "@/interfaces/form"

interface DateTimeSectionProps {
  initialDateTime?: CodingMeetingFormData["date"]
}

const DateTimeSection = ({ initialDateTime }: DateTimeSectionProps) => {
  return (
    <CodingMeetingSection>
      <CodingMeetingSection.Label className="block w-max">
        일 시
      </CodingMeetingSection.Label>
      <div className="flex flex-col sm:flex-row gap-y-6 w-full items-start">
        <div className="flex-1 w-full">
          <div className="font-medium text-[#828282]">날짜</div>
          <div className="w-full flex justify-center">
            <CreateCodingMeetingCalendar
              {...(initialDateTime && { initialDay: initialDateTime.day })}
            />
          </div>
        </div>
        <div className="flex-1 w-full">
          <div className="font-medium text-[#828282] mb-4">시간</div>
          <TimeWrapper timeType="start">
            <CodingMeetingStartHourController
              {...(initialDateTime && {
                initialStartHour: initialDateTime.start_time[0],
              })}
            />
            <CodingMeetingStartMinuteController
              {...(initialDateTime && {
                initialStartMinute: initialDateTime.start_time[1],
              })}
            />
          </TimeWrapper>
          <Spacing size={16} />
          <TimeWrapper timeType="end">
            <CodingMeetingEndHourController
              {...(initialDateTime && {
                initialEndHour: initialDateTime.end_time[0],
              })}
            />
            <CodingMeetingEndMinuteController
              {...(initialDateTime && {
                initialEndMinute: initialDateTime.end_time[1],
              })}
            />
          </TimeWrapper>
        </div>
      </div>
    </CodingMeetingSection>
  )
}

export default DateTimeSection

const TimeWrapper = ({
  timeType,
  children,
}: {
  timeType: "start" | "end"
  children: React.ReactNode
}) => {
  return (
    <div className="flex gap-x-1 justify-between sm:justify-start items-center w-full">
      <div className="flex gap-x-2">{children}</div>
      <span className="text-[#828282] font-medium shrink-0">
        {timeType === "start" ? "부터" : "까지"}
      </span>
    </div>
  )
}
