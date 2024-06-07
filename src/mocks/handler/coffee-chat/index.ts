import { mockCreateCoffeeChatApi } from "./create-coffee-chat"
import { mockDeleteCoffeeChatApi } from "./delete-coffee-chat"
import { mockEnterChatRoomApi } from "./enter-chat-room"
import { mockGetCoffeeChatDetailApi } from "./get-coffee-chat-detail"
import { mockGetCoffeeChatListApi } from "./get-coffee-chat-list"
import { mockCoffeeChatReservationApi } from "./reservation"
import { mockUpdateCoffeeChatApi } from "./update-coffee-chat"

export const mockCoffeeChatApi = [
  mockGetCoffeeChatListApi,
  mockGetCoffeeChatDetailApi,
  mockEnterChatRoomApi,
  mockCreateCoffeeChatApi,
  mockDeleteCoffeeChatApi,
  mockUpdateCoffeeChatApi,
  ...mockCoffeeChatReservationApi,
]
