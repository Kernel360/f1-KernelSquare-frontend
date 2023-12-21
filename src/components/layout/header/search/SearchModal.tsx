"use client"

import { Icons } from "@/components/icons/Icons"
import Button from "@/components/shared/button/Button"
import RowInput from "@/components/shared/input/RowInput"
import { useRef } from "react"

function SearchModal() {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <RowInput
      ref={inputRef}
      spellCheck="false"
      sideField={
        <Button
          onClick={() =>
            console.log("search:modal", { keyword: inputRef.current?.value })
          }
        >
          <Icons.Search />
        </Button>
      }
      classNames={{
        wrapper:
          "bg-colorsLightGray border-transparent hover:border-primary focus-within:outline focus-within:outline-offset-[3px] focus-within:outline-emerald-200/30",
        input: "bg-transparent",
      }}
    />
  )
}

export default SearchModal
