function PeriodTypeInfo() {
  return (
    <div className="flex justify-between w-full gap-0.5 text-xs font-bold">
      <div className="flex items-center gap-1">
        <div className="w-[10px] h-[10px] border rounded-full bg-[#fbf8ce] border-[orange]" />
        <div>멘티 모집</div>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-[10px] h-[10px] border rounded-full bg-[lightgray] border-[lightgray]" />
        <div>예약 확정</div>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-[10px] h-[10px] border rounded-full bg-primary border-primary" />
        <div>커피챗 진행</div>
      </div>
    </div>
  )
}

export default PeriodTypeInfo
