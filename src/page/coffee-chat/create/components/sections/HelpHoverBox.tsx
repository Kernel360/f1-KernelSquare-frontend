import { Icons } from "@/components/icons/Icons"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/PopOver"

function HelpHoverBox() {
  return (
    <Popover>
      <PopoverTrigger className="fade-in-100 duration-500 flex items-center cursor-pointer text-slate-400 hover:text-primary">
        <Icons.Info className="shrink-0" />
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="start"
        className="w-[calc(100vw-48px)] max-w-[360px] p-1 break-all"
      >
        <div className="text-sm">
          <div className="font-bold">
            🤔 달력에 표시되는 각 기간은 무엇을 의미하나요?
          </div>
          <div className="font-normal mt-3 flex items-center gap-1">
            <div className="w-[10px] h-[10px] rounded-full bg-[#00c47133] border-[1px] border-primary" />
            <div>
              <span className="text-primary">일주일</span> 뒤부터 커피챗 시작
              날짜로 선택할 수 있습니다.
            </div>
          </div>
          <div className="font-normal mt-3 flex items-center gap-1">
            <div className="w-[10px] h-[10px] rounded-full bg-[#fbf8ce] border-[1px] border-[orange]" />
            <div>
              선택한 커피챗 날짜가 되기 전까지&nbsp;
              <span className="text-primary">5일</span>
              &nbsp;동안 예약이 진행됩니다.
            </div>
          </div>
          <div className="font-normal mt-3 flex items-center gap-1">
            <div className="w-[10px] h-[10px] rounded-full bg-[lightgray]" />
            <div>
              이후 예약 확정을 위해&nbsp;
              <span className="text-primary">1일</span>이 소요됩니다.
            </div>
          </div>
          <div className="font-normal mt-3 flex items-center gap-1">
            <div className="w-[10px] h-[10px] rounded-full bg-primary" />
            <div>
              커피챗은 선택한 일자로부터 총&nbsp;
              <span className="text-primary">3일</span>간 진행됩니다.
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default HelpHoverBox
