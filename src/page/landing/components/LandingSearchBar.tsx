"use client"

import { Icons } from "@/components/icons/Icons"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"

const LandingSearchBar = () => {
  const { handleSubmit, control } = useForm()
  const router = useRouter()

  const handleSearch = handleSubmit((data) => {
    if (data.search) {
      router.replace(`/search?keyword=${data.search}&page=0`)
    }
  })

  return (
    <form onSubmit={handleSearch} className="w-full">
      <Controller
        name="search"
        control={control}
        render={({ field }) => (
          <div className="border-white border-[1px] p-3 w-[30%] m-auto relative flex">
            <input
              {...field}
              placeholder="당신의 관심사를 검색해보세요"
              className="w-[90%] bg-transparent outline-none text-white text-[28px] placeholder:text-white placeholder:text-[28px] px-3 placeholder:font-extralight font-extralight"
              autoComplete="off"
            />
            <div>
              <button className="absolute text-white text-[36px] cursor-pointer">
                <Icons.PlainSearch />
              </button>
            </div>
          </div>
        )}
      />
    </form>
  )
}

export default LandingSearchBar
