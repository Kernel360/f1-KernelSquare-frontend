import { CoffeeChatReservationTime } from "@/interfaces/dto/coffee-chat/coffeechat-reservation-detail.dto"
import { MyCoffeeChatReservation } from "@/interfaces/dto/coffee-chat/get-my-coffeechat-reservation"

type FindMatchedRoomArgs = {
  myCoffeeChatReservations: MyCoffeeChatReservation[] | null
  coffeeChatReservations: CoffeeChatReservationTime[]
}

export function findMatchedRoom({
  myCoffeeChatReservations,
  coffeeChatReservations,
}: FindMatchedRoomArgs) {
  if (!myCoffeeChatReservations?.length) return null
  if (!coffeeChatReservations?.length) return null

  const matchedRoom = myCoffeeChatReservations.find((myReservation) => {
    return !!coffeeChatReservations.find(
      (chatReservation) =>
        chatReservation.reservation_id === myReservation.reservation_id,
    )
  })

  if (!matchedRoom) return null

  return matchedRoom
}
