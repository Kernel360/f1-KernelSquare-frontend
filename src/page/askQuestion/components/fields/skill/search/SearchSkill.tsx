"use client"

import { Input } from "@/components/shared/input/Input"
import { useQuestionFormContext } from "@/page/askQuestion/hooks/useQuestionFormContext"
import { debounce } from "lodash-es"
import { useRef } from "react"
import { useController } from "react-hook-form"
import { IoIosCloseCircle } from "react-icons/io"
import { IoSearchOutline } from "react-icons/io5"

function SearchSkill() {
  const {
    searchSkillFormMethods: { control },
  } = useQuestionFormContext()
  const { field } = useController({ control, name: "keyword" })

  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(e.target.value)
  }

  const debounceChange = debounce(handleChange, 400)

  return (
    <div className="flex items-center border-b px-4 py-3 gap-x-4 justify-between">
      <div className="flex gap-x-4 items-center flex-1">
        <IoSearchOutline className="shrink-0 text-2xl text-colorsGray" />
        <Input
          ref={inputRef}
          placeholder="관련 있는 기술 스택을 검색해 보세요"
          spellCheck="false"
          onChange={debounceChange}
          fullWidth
          className="placeholder:transition-colors placeholder:[transition-duration:300ms] border-none p-0 rounded-none focus:placeholder:text-primary"
          wrapperClassName="border-none flex-1"
        />
      </div>
      {!!field.value ? (
        <IoIosCloseCircle
          className={`shrink-0 text-xl text-secondary pointerhover:hover:text-black pointerhover:hover:cursor-pointer`}
          onClick={() => {
            if (!inputRef.current) return

            inputRef.current.focus()
            inputRef.current.value = ""
            handleChange({ target: { value: "" } } as any)
          }}
        />
      ) : (
        <div className="shrink-0 w-5 h-5" />
      )}
    </div>
  )
}

export default SearchSkill
