"use client"

import dayjs from "dayjs"
import CoffeeChatSection from "./CoffeeChatSection"
import { getDate } from "@/util/getDate"
import { DirectionIcons, Icons } from "@/components/icons/Icons"
import TimeOptions from "./TimeOptions"
import { AM, PM } from "@/constants/timeOptions"
import { useEffect, useRef, useState } from "react"
import type { Value } from "../../detail/reservation/CustomCalendar/Calendar.types"
import { TimeZone } from "../CreateCoffeeChatReservationPage.types"
import { twJoin } from "tailwind-merge"
import { useRecoilState } from "recoil"
import { ScheduleList } from "@/recoil/atoms/coffee-chat/schedule"
import CustomCalendar from "./CustomCalendar/CustomCalendar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/HoverCard"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"

const ScheduleSection = () => {
  // 캘린더에서 선택된 날짜
  const today = new Date()
  const startDate = new Date(dayjs(today).add(7, "day").format("YYYY-MM-DD"))
  const [date, setDate] = useState<Value>()
  const [selectedDay, setSelectedDay] = useState<string>("")
  const selectDateMap = useRef<string[]>([])

  useEffect(() => {
    selectDateMap.current = [
      getDate({ date: date + "" }),
      getDate({
        date: dayjs(date + "")
          .add(1, "day")
          .format(),
      }),
      getDate({
        date: dayjs(date + "")
          .add(2, "day")
          .format(),
      }),
    ]
  }, [date])
  // 오전 or 오후
  const [timeZone, setTimeZone] = useState<TimeZone>(TimeZone.AM)
  // 선택된 시간대
  const [schedule, setSchedule] = useRecoilState(ScheduleList)

  // 오전, 오후 선택 화살표 스타일
  const ArrowClassName = (disabled: boolean) =>
    twJoin([disabled && "text-slate-200"], [!disabled && "cursor-pointer"])

  return (
    <CoffeeChatSection>
      <div className="w-full align-top max-w-full flex-col md:flex-row md:justify-start md:items-center">
        <CoffeeChatSection.Label className="block w-max flex items-center">
          <div>멘토링 가능 일시</div>
          <HoverCard>
            <HoverCardTrigger className="flex items-center ml-3 cursor-pointer text-slate-300 hover:text-primary">
              <Icons.Info />
              <div className="font-bold text-[12px] ml-2">
                달력에 표시되는 각 기간은 무엇을 의미하나요?
              </div>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="text-sm">
                <div className="font-bold">
                  🤔 달력에 표시되는 각 기간은 무엇을 의미하나요?
                </div>
                <div className="font-normal mt-3 flex items-center">
                  <div className="w-[10px] h-[10px] rounded-full bg-[#00c47133] border-[1px] border-primary mr-1"></div>{" "}
                  당일로부터 <span className="text-primary mx-1">일주일</span>{" "}
                  뒤부터 멘토링 시작 날짜로 선택할 수 있습니다.{" "}
                </div>
                <div className="font-normal mt-3 flex items-center">
                  <div className="w-[10px] h-[10px] rounded-full bg-[#fbf8ce] border-[1px] border-[orange] mr-1"></div>{" "}
                  선택한 멘토링 날짜가 되기 전까지{" "}
                  <span className="text-primary mx-1">6일</span> 동안 예약이
                  진행됩니다.
                </div>
                <div className="font-normal mt-3 flex items-center">
                  <div className="w-[10px] h-[10px] rounded-full bg-[lightgray] mr-1"></div>{" "}
                  이후 예약 확정을 위해{" "}
                  <span className="text-primary mx-1">1일</span> 이 소요됩니다.
                </div>
                <div className="font-normal mt-3 flex items-center">
                  <div className="w-[10px] h-[10px] rounded-full bg-primary mr-1"></div>{" "}
                  멘토링은 선택한 일자로부터 총{" "}
                  <span className="text-primary mx-1">3일</span> 간 진행됩니다.
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </CoffeeChatSection.Label>
        <div className="flex justify-around">
          <div>
            <CustomCalendar
              start={startDate}
              date={date}
              limit={29}
              setDate={setDate}
            />
            {!date && (
              <div className="font-bold text-primary mt-3">
                원하는 시작 일자를 클릭하면 시간대를 설정할 수 있습니다.
              </div>
            )}
            {date && (
              <div>
                <div className="font-normal mt-3 flex items-center">
                  <div className="w-[10px] h-[10px] rounded-full bg-[#fbf8ce] border-[1px] border-[orange] mr-1"></div>{" "}
                  <div>멘티 모집 기간</div>
                </div>
                <div className="font-normal mt-3 flex items-center">
                  <div className="w-[10px] h-[10px] rounded-full bg-[lightgray] mr-1"></div>{" "}
                  <div>예약 확정 기간</div>
                </div>
                <div className="font-normal mt-3 flex items-center">
                  <div className="w-[10px] h-[10px] rounded-full bg-primary mr-1"></div>{" "}
                  <div>멘토링 진행 기간</div>
                </div>
              </div>
            )}
          </div>

          {date && (
            <div>
              <div className="flex justify-center mb-5 text-xl text-secondary font-bold text-center">
                <Select onValueChange={(day: string) => setSelectedDay(day)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="날짜 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 3 }).map((_, i) => (
                      <SelectedDate
                        key={Math.random() * 1000}
                        date={date}
                        addNum={i}
                      />
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex">
                <DirectionIcons.Left
                  className={ArrowClassName(timeZone === TimeZone.AM)}
                  onClick={() => setTimeZone(TimeZone.AM)}
                />
                {timeZone === "AM" && (
                  <div className="text-center">
                    <div className="font-bold text-primary text-lg mb-5">
                      오전
                    </div>
                    <TimeOptions date={AM} selectedDay={selectedDay} />
                  </div>
                )}
                {timeZone === "PM" && (
                  <div className="text-center">
                    <div className="font-bold text-primary text-lg mb-5">
                      오후
                    </div>
                    <TimeOptions date={PM} selectedDay={selectedDay} />
                  </div>
                )}
                <DirectionIcons.Right
                  className={ArrowClassName(timeZone === TimeZone.PM)}
                  onClick={() => setTimeZone(TimeZone.PM)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </CoffeeChatSection>
  )
}

export default ScheduleSection

interface SelectedDateProps {
  date: Value
  addNum: number
}

function SelectedDate({ date, addNum }: SelectedDateProps) {
  return (
    <SelectItem
      value={getDate({
        date: dayjs(date + "")
          .add(addNum, "day")
          .format(),
      })}
    >
      {getDate({
        date: dayjs(date + "")
          .add(addNum, "day")
          .format(),
      })}
    </SelectItem>
  )
}
