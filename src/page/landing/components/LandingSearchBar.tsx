import { Icons } from "@/components/icons/Icons"

const LandingSearchBar = () => {
  return (
    <div className="border-white border-[1px] p-3 w-[30%] m-auto relative">
      <input
        placeholder="당신의 관심사를 검색해보세요"
        className="w-full bg-transparent outline-none text-white text-[28px] placeholder:text-white placeholder:text-[28px] px-3 placeholder:font-extralight font-extralight"
      />
      <Icons.PlainSearch className="absolute text-white top-4 right-5 text-[36px] cursor-pointer" />
    </div>
  )
}

export default LandingSearchBar
