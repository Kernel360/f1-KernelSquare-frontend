import { CoffeeChatQueries } from "@/react-query/coffee-chat"

const useReservationForMentee = () => {
  const { data } = CoffeeChatQueries.useGetMyCoffeeChatReservation()

  return {
    MyReservations: data,
  }
}

export default useReservationForMentee
