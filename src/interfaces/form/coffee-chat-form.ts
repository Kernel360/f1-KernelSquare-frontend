import { CoffeeChatReservationDetailPayload } from "../dto/coffee-chat/coffeechat-reservation-detail.dto"

export type CoffeeChatPageMode = "create" | "update"

export interface CoffeeChatFormData {
  title: string
  content: string
  introduction: string
  dateTimes?: string[]
  hashTags?: string[]
}

export type InitialCoffeeChat = CoffeeChatReservationDetailPayload & {
  introduction: string
}
