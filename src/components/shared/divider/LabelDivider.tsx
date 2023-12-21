interface LabelDividerProps {
  label: React.ReactNode
}

function LabelDivider({ label }: LabelDividerProps) {
  return (
    <div className="relative flex justify-center items-center">
      <div className="absolute left-0 top-0 h-full flex items-center w-full">
        <div className="w-full bg-colorsGray h-[1px]" />
      </div>
      <div className="relative bg-white inline-block align-top px-2 py-1 text-[#abb0b5] text-xs">
        {label}
      </div>
    </div>
  )
}

export default LabelDivider
