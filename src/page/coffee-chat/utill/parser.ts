import {
  ChangeHashTag,
  ChangeReservation,
} from "@/interfaces/dto/coffee-chat/update-coffeechat-post.dto"
import {
  CoffeeChatFormData,
  InitialCoffeeChat,
} from "@/interfaces/form/coffee-chat-form"

export function payloadToFormData(
  payload?: InitialCoffeeChat,
): CoffeeChatFormData {
  if (!payload) {
    return {
      title: "",
      introduction: "",
      content: "",
      hashTags: [],
      dateTimes: [],
    }
  }

  const { title, introduction, content, date_times, hashtags } = payload

  return {
    title,
    introduction,
    content,
    dateTimes: date_times.map(({ reservation_id, start_time }) => ({
      reservationId: reservation_id,
      startTime: start_time,
    })),
    hashTags: hashtags.map(({ hashtag_id, content }) => ({
      hashTagId: hashtag_id,
      content,
    })),
  }
}

export function createChangeHashTagsPayload({
  initialHashTags,
  hashTagsPayload,
}: {
  initialHashTags: InitialCoffeeChat["hashtags"]
  hashTagsPayload?: CoffeeChatFormData["hashTags"]
}) {
  const payload = hashTagsPayload ?? []

  if (!initialHashTags.length && !payload.length) return null

  if (!initialHashTags.length && !!payload.length) {
    return payload.map((hashTag) => ({
      changed: "add",
      hashtag_id: null,
      content: hashTag.content,
    })) as ChangeHashTag[]
  }

  if (!!initialHashTags.length && !payload.length) {
    return initialHashTags.map((initialHashTag) => ({
      changed: "remove",
      content: initialHashTag.content,
      hashtag_id: initialHashTag.hashtag_id,
    })) as ChangeHashTag[]
  }

  const initialHashTagContents = initialHashTags.map(
    (hashTag) => hashTag.content,
  )
  const result = [] as ChangeHashTag[]

  // remove target hashtag
  for (const { hashtag_id, content } of initialHashTags) {
    if (!payload.find((tag) => tag.content === content)) {
      result.push({ changed: "remove", hashtag_id, content })
    }
  }

  // add target hashtag
  for (const tag of payload) {
    if (!initialHashTagContents.includes(tag.content)) {
      result.push({ changed: "add", hashtag_id: null, content: tag.content })
    }
  }

  return result.length ? result : null
}

export function createChangeDateTimesPayload({
  initialDateTimes,
  dateTimesPayload,
}: {
  initialDateTimes: InitialCoffeeChat["date_times"]
  dateTimesPayload?: CoffeeChatFormData["dateTimes"]
}) {
  const payload = dateTimesPayload ?? []

  if (!initialDateTimes.length && !payload.length) return null

  if (!initialDateTimes.length && !!payload.length) {
    return payload.map((dateTime) => ({
      changed: "add",
      reservation_id: null,
      start_time: dateTime.startTime,
    })) as ChangeReservation[]
  }

  const initialDateTimeStartTimes = initialDateTimes.map(
    (dateTime) => dateTime.start_time,
  )
  const result = [] as ChangeReservation[]

  // remove target reservation
  for (const { reservation_id, start_time } of initialDateTimes) {
    if (!payload.find((dateTime) => dateTime.startTime === start_time)) {
      result.push({ changed: "remove", reservation_id, start_time })
    }
  }

  // add target reservation
  for (const dateTime of payload) {
    if (!initialDateTimeStartTimes.includes(dateTime.startTime)) {
      result.push({
        changed: "add",
        reservation_id: null,
        start_time: dateTime.startTime,
      })
    }
  }

  return result.length ? result : null
}
