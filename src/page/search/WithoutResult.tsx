import NoSearchResult from "@/components/shared/animation/NoSearchResult"
import {
  noSearchResultMessage,
  searchTipMessage,
} from "@/constants/message/search"

const WithoutResult = ({ keyword }: { keyword: string }) => {
  return (
    <div>
      <div className="flex w-full justify-center">
        <NoSearchResult
          className="[&>svg]:!w-full [&>svg]:!max-w-[350px] [&>svg]:!h-[280px]"
          style={{ marginBlockStart: "-62px", marginBlockEnd: "-82px" }}
        />
      </div>
      <div className="text-xl font-bold text-center mb-[50px] px-2">
        <div className="inline-flex align-top">
          <span className="text-danger">&apos;</span>
          <span className="inline-block align-top text-danger whitespace-nowrap overflow-hidden text-ellipsis max-w-[154px]">
            {keyword}
          </span>
          <span className="text-danger">&apos;</span>
        </div>{" "}
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
