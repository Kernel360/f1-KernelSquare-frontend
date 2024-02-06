"use client"

import { Icons } from "@/components/icons/Icons"
import Button from "@/components/shared/button/Button"
import RowInput from "@/components/shared/input/RowInput"
import useModal from "@/hooks/useModal"
import { useRouter } from "next/navigation"
import { useRef } from "react"
import { Controller, useForm } from "react-hook-form"

interface SearchForm {
  search: string
}

function SearchModal() {
  const { closeModal } = useModal()
  const router = useRouter()
  const { register, handleSubmit, control } = useForm<SearchForm>()
  const wrapperRef = useRef<HTMLDivElement>(null)

  // const handleSubmitData = handleSubmit(data) => {
  //   router.replace(`/search?keyword=${data.search}&page=0`)
  //   closeModal()
  // }

  const handleFocus = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    if (e.target.tagName === "INPUT") {
      if (wrapperRef.current) {
        wrapperRef.current.style.borderColor = "#00c471"
      }
    }
  }

  const handleSubmitData = handleSubmit((data) => {
    console.log("[modal] data", data)
    if (data.search) {
      router.replace(`/search?keyword=${data.search}&page=0`)
    }
    closeModal()
  })

  return (
    <form onSubmit={handleSubmitData}>
      {/* <RowInput
        {...(register("search"), { required: true })}
        spellCheck="false"
        sideField={
          <Button type="submit">
            <Icons.Search />
          </Button>
        }
        classNames={{
          wrapper:
            "bg-colorsLightGray border-transparent hover:border-primary focus-within:outline focus-within:outline-offset-[3px] focus-within:outline-emerald-200/30",
          input: "bg-transparent",
        }}
      /> */}
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
  )
}

export default SearchModal
