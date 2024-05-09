import AreaImage from "@/page/coding-meetings/main/info-area/AreaImage"

function ExpiredDueDate() {
  return (
    <div className="flex gap-3 items-center">
      <AreaImage className="sm:block" />
      <span className="text-secondary font-bold">
        커피 챗을 이용할 수 없습니다(기한 만료)
      </span>
    </div>
  )
}

export default ExpiredDueDate
