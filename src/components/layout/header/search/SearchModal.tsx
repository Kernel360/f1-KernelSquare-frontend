"use client"

import { Icons } from "@/components/icons/Icons"
import Button from "@/components/shared/button/Button"
import RowInput from "@/components/shared/input/RowInput"
import useModal from "@/hooks/useModal"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

interface SearchForm {
  search: string
}

function SearchModal() {
  const { closeModal } = useModal()
  const router = useRouter()
  const { register, handleSubmit } = useForm<SearchForm>()

  const handleSubmitData = (data: SearchForm) => {
    router.replace(`/search?keyword=${data.search}&page=0`)
    closeModal()
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitData)}>
      <RowInput
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
      />
    </form>
  )
}

export default SearchModal
