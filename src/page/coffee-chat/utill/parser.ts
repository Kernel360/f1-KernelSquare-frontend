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
    dateTimes: date_times.map(({ start_time }) => start_time),
    hashTags: hashtags.map(({ content }) => content),
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
      content: hashTag,
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
    if (!payload.includes(content)) {
      result.push({ changed: "remove", hashtag_id, content })
    }
  }

  // add target hashtag
  for (const content of payload) {
    if (!initialHashTagContents.includes(content)) {
      result.push({ changed: "add", hashtag_id: null, content })
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
      start_time: dateTime,
    })) as ChangeReservation[]
  }

  const initialDateTimeStartTimes = initialDateTimes.map(
    (dateTime) => dateTime.start_time,
  )
  const result = [] as ChangeReservation[]

  // remove target reservation
  for (const { reservation_id, start_time } of initialDateTimes) {
    if (!payload.includes(start_time)) {
      result.push({ changed: "remove", reservation_id, start_time })
    }
  }

  // add target reservation
  for (const startTime of payload) {
    if (!initialDateTimeStartTimes.includes(startTime)) {
      result.push({
        changed: "add",
        reservation_id: null,
        start_time: startTime,
      })
    }
  }

  return result.length ? result : null
}
