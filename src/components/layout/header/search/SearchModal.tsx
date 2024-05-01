"use client"

import { Icons } from "@/components/icons/Icons"
import Button from "@/components/shared/button/Button"
import RowInput from "@/components/shared/input/RowInput"
import useModal from "@/hooks/useModal"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"

interface SearchForm {
  keyword: string
}

function SearchModal() {
  const router = useRouter()

  const { closeModal } = useModal()

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<SearchForm>()

  const onSubmit = (data: SearchForm) => {
    if (isSubmitting) return

    if (data.keyword) {
      router.replace(`/search?keyword=${data.keyword}&page=0`)
    }

    closeModal()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="keyword"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <RowInput
            {...field}
            placeholder="검색어를 입력하세요"
            autoComplete="off"
            classNames={{
              container: "w-full",
            }}
            sideField={
              <Button type="submit" className="p-1">
                <Icons.Search className="text-lg" />
              </Button>
            }
          />
        )}
      />
    </form>
  )
}

export default SearchModal
