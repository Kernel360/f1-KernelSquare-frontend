"use client"

import { Icons } from "@/components/icons/Icons"
import { Controller, useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import RowInput from "@/components/shared/input/RowInput"
import Button from "@/components/shared/button/Button"
import { useSetRecoilState } from "recoil"
import { HeaderMobileMenuOpenAtom } from "@/recoil/atoms/menu/headerMenu"

interface SearchForm {
  keyword: string
}

function SearchArea() {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    resetField,
  } = useForm<SearchForm>()

  const router = useRouter()

  const setMobileMenuOpen = useSetRecoilState(HeaderMobileMenuOpenAtom)

  const onSubmit = (data: SearchForm) => {
    if (isSubmitting) return

    setMobileMenuOpen(false)

    resetField("keyword")
    ;(document.activeElement as HTMLElement)?.blur()

    setTimeout(() => {
      router.replace(`/search?keyword=${data.keyword}&page=0`)
    }, 0)
  }

  return (
    <form className="flex justify-center" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="keyword"
        control={control}
        rules={{ required: true }}
        defaultValue=""
        render={({ field }) => (
          <RowInput
            {...field}
            placeholder="검색어를 입력하세요"
            autoComplete="off"
            classNames={{
              container: "w-[380px]",
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

export default SearchArea
