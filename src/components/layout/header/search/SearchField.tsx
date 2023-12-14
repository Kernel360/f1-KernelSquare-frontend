"use client"

import { Icons } from "@/components/icons/Icons"
import Button from "@/components/shared/button/Button"
import RowInput from "@/components/shared/input/RowInput"
import { useRef } from "react"

function SearchField() {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <RowInput
      ref={inputRef}
      spellCheck="false"
      sideField={
        <Button
          onClick={() =>
            console.log("search", { keyword: inputRef.current?.value })
          }
        >
          <Icons.Search />
        </Button>
      }
      classNames={{
        container: "hidden sm:inline-flex sm:w-[380px]",
        wrapper:
          "bg-colorsLightGray border-transparent hover:border-colorsGray focus-within:outline focus-within:outline-offset-[3px] focus-within:outline-emerald-200/30",
        input: "bg-transparent",
      }}
    />
  )
}

export default SearchField
