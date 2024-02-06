"use client"

import { Icons } from "@/components/icons/Icons"
import useModal from "@/hooks/useModal"
import { useRef } from "react"
import { Controller, useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import SearchModal from "./SearchModal"

function SearchArea() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { openModal } = useModal()
  const { handleSubmit, control } = useForm()
  const router = useRouter()

  const handleFocus = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    if (e.target.tagName === "INPUT") {
      if (wrapperRef.current) {
        wrapperRef.current.style.borderColor = "#00c471"
      }
    }
  }

  const handleSubmitData = handleSubmit((data) => {
    console.log("[bar] data", data)
    if (data.search) {
      router.replace(`/search?keyword=${data.search}&page=0`)
    }
  })

  return (
    <>
      <form
        className="flex flex-col justify-center hidden sm:block"
        onSubmit={handleSubmitData}
      >
        <Controller
          name="search"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className="relative z-[100] mt-1 inline-flex align-top flex-col max-w-full">
              <div
                ref={wrapperRef}
                className="relative flex sm:w-[400px] sm:border sm:border-colorsGray inline-flex align-top sm:px-4 py-1 justify-between items-center rounded-lg focus:bg-primary"
              >
                <input
                  {...field}
                  onFocus={handleFocus}
                  className="w-[90%] text-align-center text-s focus:outline-none border-transparent focus:border-transparent"
                  placeholder={""}
                  autoComplete="off"
                />
                <div className="mt-1 cursor-pointer">
                  <button className="cursor-pointer" type="submit">
                    <Icons.Search />
                  </button>
                </div>
              </div>
            </div>
          )}
        />
      </form>
      <button
        className="cursor-pointer sm:hidden block"
        onClick={() =>
          openModal({
            containsHeader: false,
            content: <SearchModal />,
            classNames: "self-start mt-[72px]",
          })
        }
      >
        <Icons.Search />
      </button>
    </>
  )
}

export default SearchArea
