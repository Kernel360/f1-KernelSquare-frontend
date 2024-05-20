import { CreateCodingMeetingRequest } from "@/interfaces/dto/coding-meeting/create-coding-meeting.dto"
import { CodingMeetingDetailPayload } from "@/interfaces/dto/coding-meeting/get-coding-meeting-detail.dto"
import { UpdateCodingMeetingRequest } from "@/interfaces/dto/coding-meeting/update-coding-meeting.dto"
import { CodingMeetingFormData } from "@/interfaces/form"
import { getKorDayjs } from "@/util/getDate"

type Action = "create" | "update"

export function formDataToPayload(
  action: "create",
  formData: CodingMeetingFormData,
): CreateCodingMeetingRequest
export function formDataToPayload(
  action: "update",
  formData: CodingMeetingFormData,
  codingMeetingToken: string,
): UpdateCodingMeetingRequest
export function formDataToPayload(
  action: Action,
  formData: CodingMeetingFormData,
  codingMeetingToken?: string,
) {
  const { title, location, member_upper_limit, date, hashtags, content } =
    formData

  const dayInstance = getKorDayjs(date.day)
  const [startHour, startMinute] = date.start_time
  const [endHour, endMinute] = date.end_time

  const basePayload = {
    coding_meeting_title: title,
    coding_meeting_location_id: location.id,
    coding_meeting_location_place_name: location.place_name,
    coding_meeting_location_longitude: location.longitude,
    coding_meeting_location_latitude: location.latitude,
    coding_meeting_member_upper_limit: member_upper_limit,
    coding_meeting_start_time: dayInstance
      .clone()
      .set("hours", Number(startHour))
      .set("minutes", Number(startMinute))
      .toISOString()
      .replace(/Z$/, ""),
    coding_meeting_end_time: dayInstance
      .clone()
      .set("hours", Number(endHour))
      .set("minutes", Number(endMinute))
      .toISOString()
      .replace(/Z$/, ""),
    coding_meeting_hashtags: hashtags.map(({ tag }) => tag),
    coding_meeting_content: content,
  }

  if (action === "create") {
    return {
      ...basePayload,
    } as CreateCodingMeetingRequest
  }

  return {
    ...basePayload,
    coding_meeting_token: codingMeetingToken,
  } as UpdateCodingMeetingRequest
}

export function payloadToFormData(
  payload: CodingMeetingDetailPayload,
): CodingMeetingFormData {
  return {
    title: payload.coding_meeting_title,
    content: payload.coding_meeting_content,
    member_upper_limit: payload.coding_meeting_member_upper_limit,
    date: {
      ...parseCodingMeetingDate({
        startTime: payload.coding_meeting_start_time,
        endTime: payload.coding_meeting_end_time,
      }),
    },
    location: {
      id: payload.coding_meeting_location_id,
      longitude: payload.coding_meeting_location_longitude,
      latitude: payload.coding_meeting_location_latitude,
      place_name: payload.coding_meeting_location_place_name,
    },
    hashtags: payload.coding_meeting_hashtags.map((hashtag) => ({
      tag: hashtag,
    })),
  }
}

const parseCodingMeetingDate = ({
  startTime,
  endTime,
}: {
  startTime: string
  endTime: string
}) => {
  const day = getKorDayjs(startTime).startOf("days").toDate()
  const start_time = [
    getKorDayjs(startTime).format("HH"),
    getKorDayjs(startTime).format("mm"),
  ]
  const end_time = [
    getKorDayjs(endTime).format("HH"),
    getKorDayjs(endTime).format("mm"),
  ]

  return {
    day,
    start_time,
    end_time,
  } as CodingMeetingFormData["date"]
}
