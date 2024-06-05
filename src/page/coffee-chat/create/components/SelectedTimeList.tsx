import { ReservationSelectedDateAtom } from "@/recoil/atoms/coffee-chat/date"
import { useSelectedChatTimes } from "../hooks/useSelectedChatTimes"
import Button from "@/components/shared/button/Button"
import dayjs from "dayjs"
import { IoCloseCircle } from "react-icons/io5"
import { useRecoilValue } from "recoil"
import { useDomainEditMode } from "@/hooks/editor/useDomainEditMode"

function SelectedTimeList() {
  const editMode = useDomainEditMode()
  const selectedDate = useRecoilValue(ReservationSelectedDateAtom)

  const { selectedChatTimeList, count, removeSelectedChatTime } =
    useSelectedChatTimes()

  if (editMode === "update") {
    return (
      <div className="flex w-full h-9 items-center px-2 text-sm text-[#828282] font-semibold bg-light-green">
        현재 커피 챗의 일시 수정은 할 수 없습니다.
      </div>
    )
  }

  if (!selectedDate) {
    return (
      <div className="flex w-full h-9 items-center px-2 text-sm text-[#828282] font-semibold bg-light-green">
        커피 챗의 시작 날짜를 선택해주세요.
      </div>
    )
  }

  if (!count) {
    return (
      <div className="flex w-full h-9 items-center px-2 text-sm text-[#828282] font-semibold bg-light-green">
        커피 챗의 시간을 선택해주세요.
      </div>
    )
  }

  return (
    <div className="@container">
      <ul className="grid w-full gap-x-0 gap-y-2 grid-cols-1 @[220px]:grid-cols-2 @[340px]:grid-cols-3 @[440px]:grid-cols-4 @[600px]:grid-cols-5 @[700px]:grid-cols-6 @[800px]:grid-cols-7 @[900px]:grid-cols-8">
        {selectedChatTimeList!.map((time) => {
          return (
            <li
              key={time}
              className="bg-white @[220px]:mx-auto h-9 px-2 rounded-lg"
            >
              <div className="flex gap-1 justify-center @[220px]:justify-start items-center h-full">
                <div className="flex flex-row gap-1 @[220px]:flex-col @[220px]:gap-0">
                  <span className="text-xs font-bold">
                    {dayjs(time).format("YYYY.MM.DD")}
                  </span>
                  <span className="text-xs">{dayjs(time).format("HH:mm")}</span>
                </div>
                <Button
                  className="group shrink-0 p-0.5 rounded-full"
                  onClick={() =>
                    removeSelectedChatTime({ dateTime: dayjs(time).toDate() })
                  }
                >
                  <IoCloseCircle className="text-lg fill-danger pointerhover:group-hover:fill-rose-500" />
                </Button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SelectedTimeList
