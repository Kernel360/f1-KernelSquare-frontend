"use client"

import { Icons } from "@/components/icons/Icons"
import useModal from "@/hooks/useModal"
import { ChangeEvent, useRef, useState } from "react"
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useForm,
} from "react-hook-form"
import { useRouter } from "next/navigation"
import SearchField from "./SearchField"
import SearchModal from "./SearchModal"

enum KeyBoardEventKey {
  Enter = "Enter",
  ArrowDown = "ArrowDown",
  ArrowUp = "ArrowUp",
  Escape = "Escape",
}

function SearchArea() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { openModal } = useModal()
  const { handleSubmit, control } = useForm()
  const router = useRouter()
  const [isBtnShown, setIsBtnShown] = useState<boolean>(true)

  const handleFocus = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    if (e.target.tagName === "INPUT") {
      if (wrapperRef.current) {
        wrapperRef.current.style.borderColor = "#00c471"
      }
    }
  }

  const handleSubmitData = handleSubmit((data) => {
    if (data.search) {
      router.replace(`/search?keyword=${data.search}&page=0`)
    }
  })

  const handleButtonClick = () => {
    setIsBtnShown(false)
    openModal({
      containsHeader: false,
      content: <SearchModal />,
      classNames: "self-start mt-[72px]",
    })
  }

  return (
    <>
      <form
        className="flex flex-col justify-center"
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
                  className="w-[90%] text-align-center text-s focus:outline-none border-transparent focus:border-transparent hidden sm:block"
                  placeholder={""}
                  autoComplete="off"
                />
                <div className="mt-1 cursor-pointer">
                  <button
                    className="cursor-pointer"
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
                </div>
              </div>
            </div>
          )}
        />
      </form>
    </>
  )
}

export default SearchArea
