export type CodingMeetingHourMinuteTime = {
  hour:
    | (typeof CODING_MEETING_HOURS)["AM"][number]
    | (typeof CODING_MEETING_HOURS)["PM"][number]
  minute: (typeof CODING_MEETING_MINUTES)[number]
}

export type CodingMeetingTimeOption = {
  AM: `${(typeof CODING_MEETING_HOURS)["AM"][number]}:${(typeof CODING_MEETING_MINUTES)[number]}`
  PM: `${(typeof CODING_MEETING_HOURS)["PM"][number]}:${(typeof CODING_MEETING_MINUTES)[number]}`
}
export type CodingMeetingTimeOptions = {
  AM: Array<CodingMeetingTimeOption["AM"]>
  PM: Array<CodingMeetingTimeOption["PM"]>
}

export const enum TimeZone {
  AM = "AM",
  PM = "PM",
}

export const CODING_MEETING_HOURS = {
  AM: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
  PM: ["12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
} as const

export const CODING_MEETING_MINUTES = ["00", "30"] as const

export const CODING_MEETING_AM_OPTIONS: CodingMeetingTimeOptions["AM"] = [
  "00:00",
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
]

export const CODING_MEETING_PM_OPTIONS: CodingMeetingTimeOptions["PM"] = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
]
