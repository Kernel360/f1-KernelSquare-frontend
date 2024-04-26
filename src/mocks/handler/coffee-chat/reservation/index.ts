import { mockCancelCoffeeChatReservationApi } from "./cancel-reservation"
import { mockGetMyCoffeeChatReservationApi } from "./get-my-coffeechat-reservation"
import { mockMakeCoffeeChatReservationApi } from "./make-reservation"

export const mockCoffeeChatReservationApi = [
  mockMakeCoffeeChatReservationApi,
  mockCancelCoffeeChatReservationApi,
  mockGetMyCoffeeChatReservationApi,
]
