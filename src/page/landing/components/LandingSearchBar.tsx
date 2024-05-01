"use client"

import { Icons } from "@/components/icons/Icons"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

interface LandingSearch {
  search: string
}

const LandingSearchBar = () => {
  const { register, handleSubmit } = useForm<LandingSearch>()
  const router = useRouter()

  const handleSearch = handleSubmit((data) => {
    if (data.search) {
      router.replace(`/search?keyword=${data.search}&page=0`)
    }
  })

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="border-white border-[1px] p-3 w-[90%] sm:w-[500px] m-auto relative flex">
        <input
          {...register("search")}
          placeholder="당신의 관심사를 검색해보세요"
          className="w-[90%] bg-transparent outline-none text-white text-[28px] placeholder:text-white placeholder:text-[20px] sm:placeholder:text-[28px] px-3 placeholder:font-extralight font-extralight"
          autoComplete="off"
        />
        <div>
          <button className="absolute text-white text-[36px] cursor-pointer">
            <Icons.PlainSearch />
          </button>
        </div>
      </div>
    </form>
  )
}

export default LandingSearchBar
