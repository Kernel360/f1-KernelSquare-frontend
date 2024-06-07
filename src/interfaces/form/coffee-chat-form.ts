import { CoffeeChatReservationDetailPayload } from "../dto/coffee-chat/coffeechat-reservation-detail.dto"

export type CoffeeChatPageMode = "create" | "update"

type DateTimesFieldArrayItem = {
  reservationId?: number
  startTime: string
}

type HashTagsFieldArrayItem = {
  hashTagId?: number
  content: string
}

export interface CoffeeChatFormData {
  title: string
  content: string
  introduction: string
  dateTimes: DateTimesFieldArrayItem[]
  hashTags?: HashTagsFieldArrayItem[]
}

export type InitialCoffeeChat = CoffeeChatReservationDetailPayload & {
  introduction: string
}
