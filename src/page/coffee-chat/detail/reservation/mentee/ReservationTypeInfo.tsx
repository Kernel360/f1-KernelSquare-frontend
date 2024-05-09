function ReservationTypeInfo() {
  return (
    <div className="flex justify-end w-full gap-2 mt-3">
      <div className="flex items-center gap-1">
        <div className="w-[10px] h-[10px] border rounded-full bg-info" />
        <div>내 예약</div>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-[10px] h-[10px] border rounded-full bg-white" />
        <div>예약 가능</div>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-[10px] h-[10px] border rounded-full bg-slate-400" />
        <div>예약 불가능</div>
      </div>
    </div>
  )
}

export default ReservationTypeInfo
