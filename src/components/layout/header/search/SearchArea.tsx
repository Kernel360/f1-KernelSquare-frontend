"use client"

import Button from "@/components/shared/button/Button"
import SearchField from "./SearchField"
import SearchModal from "./SearchModal"
import { Icons } from "@/components/icons/Icons"
import useModal from "@/hooks/useModal"
import { CommonCommand } from "@/components/shared/command/CommonCommand"
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react"
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useForm,
} from "react-hook-form"
import { useRouter } from "next/navigation"
import { twMerge } from "tailwind-merge"

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
  /**
   * 키보드 이벤트 발생 시 저장될 값
   */
  const [autoKeyword, setAutoKeyword] = useState<string>("")
  /**
   * 키보드 이벤트로 선택되게 하는 자동 완성 모드 결정
   */
  const [isAuto, setIsAuto] = useState<boolean>(false)
  /**
   * 현재 키보드로 선택된 위치
   */
  const [focusIdx, setFocusIdx] = useState<number>(0)

  const handleFocus = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    if (e.target.tagName === "INPUT") {
      if (wrapperRef.current) {
        wrapperRef.current.style.borderColor = "#00c471"
      }
    }
  }

  const handleSubmitData = handleSubmit((data) => {
    if (data.search) {
      console.log("data", data.search)

      router.replace(`/search?keyword=${data.search}`)
    }
  })

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FieldValues, "search">,
  ) => {
    field.onChange(e.target.value)
    setIsAuto(false)
    setFocusIdx(-1)
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
                className="relative flex w-[400px] border border-colorsGray inline-flex align-top px-4 py-1 justify-between items-center rounded-lg focus:bg-primary"
              >
                <input
                  {...field}
                  onFocus={handleFocus}
                  onChange={(e) => handleInputChange(e, field)}
                  className="w-[90%] text-align-center text-s focus:outline-none border-transparent focus:border-transparent"
                  placeholder={""}
                  autoComplete="off"
                />
                <div className="mt-1 cursor-pointer">
                  <button className="cursor-pointer">
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
