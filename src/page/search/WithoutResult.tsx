import NoSearchResult from "@/components/shared/animation/NoSearchResult"
import { notificationMessage, searchTipMessage } from "@/constants/message"

const WithoutResult = () => {
  return (
    <div>
      <div className="w-full flex justify-center">
        <NoSearchResult style={{ width: "350px" }} />
      </div>
      <div className="text-xl font-bold text-center mt-[-50px] mb-[50px]">
        {notificationMessage.noSearchResult}
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
