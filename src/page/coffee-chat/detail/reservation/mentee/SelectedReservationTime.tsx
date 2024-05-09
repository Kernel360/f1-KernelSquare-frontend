import { ReservationSelectedDateAtom } from "@/recoil/atoms/coffee-chat/date"
import { getDate } from "@/util/getDate"
import { useRecoilValue } from "recoil"

interface SelectedReservationTimeProps {
  startTime: string
}

function SelectedReservationTime({ startTime }: SelectedReservationTimeProps) {
  const selectedDate = useRecoilValue(ReservationSelectedDateAtom)

  return (
    <div className="mt-3 text-center text-xl text-secondary font-bold">
      {getDate({
        date: selectedDate?.toString() ?? startTime,
      })}
    </div>
  )
}

export default SelectedReservationTime
