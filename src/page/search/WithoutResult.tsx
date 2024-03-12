import NoSearchResult from "@/components/shared/animation/NoSearchResult"
import {
  noSearchResultMessage,
  searchTipMessage,
} from "@/constants/message/search"

const WithoutResult = () => {
  return (
    <div>
      <div className="w-full flex justify-center mt-[-70px] ">
        <NoSearchResult style={{ width: "350px" }} />
      </div>
      <div className="text-xl font-bold text-center mt-[-70px] mb-[50px]">
        {noSearchResultMessage}
      </div>
      <div className="m-auto border-[1px] border-slate-300 px-[60px] py-[20px] rounded w-[60%] text-slate-500">
        <div className="font-bold mb-[5px] text-lg text-black">검색 TIP</div>
        {searchTipMessage.map((msg, i) => (
          <div key={i}>• {msg}</div>
        ))}
      </div>
    </div>
  )
}

export default WithoutResult
