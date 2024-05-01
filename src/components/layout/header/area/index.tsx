import UserArea from "../UserArea"
import SearchArea from "../search/SearchArea"

function Area() {
  return (
    <div className="flex justify-center items-center flex-1">
      <div className="hidden sm:flex sm:flex-1 sm:justify-center sm:items-center">
        <SearchArea />
      </div>
      <div className="hidden pc:block shrink-0">
        <UserArea />
      </div>
    </div>
  )
}

export default Area
