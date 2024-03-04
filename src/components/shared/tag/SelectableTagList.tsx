"use client"

import { useRef } from "react"
import SelectableTag from "./SelectableTag"
import { Input } from "../input/Input"
import Spacing from "../Spacing"
import Tag from "./Tag"
import { MdClose } from "react-icons/md"
import { useSelectTagList } from "@/hooks/useSelectTagList"
import type { TechTag } from "@/interfaces/tech-tag"
import type { UseSelectTagListOption } from "@/hooks/useSelectTagList"
import { useQuery } from "@tanstack/react-query"
import { searchTags } from "@/service/techs"
import { useRecoilState } from "recoil"
import { searchTagAtom } from "@/recoil/atoms/tag"
import Button from "../button/Button"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { debounce } from "lodash-es"
import ContentLoading from "../animation/ContentLoading"
import Skeleton from "react-loading-skeleton"
import RowInput from "../input/RowInput"
import { IoSearchOutline } from "react-icons/io5"

interface TagState {
  renderTagList: Array<TechTag>
  selectedTagList: Array<TechTag>
}

interface SelectableTagListProps {
  uniqueKey: string
  tagList?: Array<TechTag>
  questionId?: number
  initialSelectedTagList?: TagState["selectedTagList"]
  searchable?: boolean
  maximumLength?: number
  callback?: UseSelectTagListOption["callback"]
}

export const maximumSelectableError = new Error()
maximumSelectableError.cause = {
  type: "maximumSelectable",
}

function SelectableTagList({
  uniqueKey,
  questionId,
  initialSelectedTagList,
  searchable = false,
  maximumLength,
  callback,
}: SelectableTagListProps) {
  const { selectedTagList, select, unselect } = useSelectTagList({
    uniqueKey,
    questionId,
    initialSelectedTagList,
    callback,
  })

  return (
    <div>
      {searchable && (
        <>
          <SelectableTagList.Search />
          <Spacing size={20} />
        </>
      )}
      <PaginationTechTagList
        selectedTagList={selectedTagList}
        select={select}
        unselect={unselect}
        maximumLength={maximumLength}
      />
    </div>
  )
}

SelectableTagList.Search = function SelectableTagListSearch() {
  const [search, setSearch] = useRecoilState(searchTagAtom)

  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = inputRef.current?.value ?? ""

    setSearch((prev) => ({
      ...prev,
      keyword: targetValue,
      page: 0,
    }))
  }

  const debounceChange = debounce(handleChange, 400)

  return (
    <RowInput
      ref={inputRef}
      placeholder="관련 있는 기술 스택을 검색해 보세요"
      onChange={debounceChange}
      sideField={<IoSearchOutline />}
      classNames={{ wrapper: "!border-colorsGray mt-4", input: "py-1" }}
    />
  )
}

SelectableTagList.SummarizedSelectedTagList =
  function SummerizedSelectedTagList({
    uniqueKey,
    questionId,
    callback,
  }: UseSelectTagListOption) {
    const { selectedTagList, unselect } = useSelectTagList({
      uniqueKey,
      questionId,
      callback,
    })

    return (
      <ul className="flex gap-2 flex-wrap">
        {selectedTagList.map((selectedTag) => {
          return (
            <li key={`${selectedTag}`}>
              <Tag className="inline-flex align-top items-center gap-2 border bg-white text-secondary hover:bg-white border-primary text-xs">
                <span className="flex-1 shrink-0 line-clamp-1 text-ellipsis">
                  {selectedTag}
                </span>
                <div
                  className="transition-colors w-5 h-5 p-1 rounded-full border flex justify-center items-center bg-white hover:bg-secondary hover:text-white"
                  onClick={() => {
                    unselect(selectedTag)
                  }}
                >
                  <MdClose />
                </div>
              </Tag>
            </li>
          )
        })}
      </ul>
    )
  }

export default SelectableTagList

function PaginationTechTagList({
  maximumLength,
  selectedTagList,
  select,
  unselect,
}: {
  maximumLength?: SelectableTagListProps["maximumLength"]
  selectedTagList: Array<string>
  select: (tag: string) => void
  unselect: (tag: string) => void
}) {
  const [{ keyword, page: searchPage }, setSearchTag] =
    useRecoilState(searchTagAtom)

  const {
    data: searchPayload,
    isPending,
    error,
  } = useQuery({
    queryKey: ["techs", keyword, searchPage],
    queryFn: () => searchTags({ page: searchPage, keyword }),
    select(response) {
      return response.data
    },
  })

  const Content = () => {
    if (!searchPayload?.data?.tech_stack_list)
      return Array.from({ length: 10 }).map((_, index) => (
        <li key={index} className="w-[100px] h-7 rounded-lg overflow-hidden">
          <Skeleton />
        </li>
      ))

    return searchPayload?.data?.tech_stack_list.map((tag, index) => {
      return (
        <li key={`${tag}-${index}`}>
          <SelectableTag
            tag={tag}
            onSelect={({ selected, tag }) => {
              if (!maximumLength) {
                selected ? select(tag) : unselect(tag)

                return
              }

              if (selected && selectedTagList.length >= maximumLength) {
                ;(maximumSelectableError.cause as any).maximum = maximumLength
                throw maximumSelectableError
              }

              selected ? select(tag) : unselect(tag)
            }}
            selected={selectedTagList.includes(tag)}
          />
        </li>
      )
    })
  }

  const NextPageButton = () => {
    const fetchNext = () => {
      if (searchPayload?.data?.pagination.is_end) {
        return
      }

      setSearchTag((prev) => ({
        ...prev,
        page: prev.page + 1,
      }))
    }

    if (searchPayload?.data?.pagination.is_end) return null

    return (
      <Button
        className="absolute -right-8 top-1/2 -translate-y-1/2"
        onClick={fetchNext}
      >
        <IoIosArrowForward />
      </Button>
    )
  }

  const PrevPageButton = () => {
    const fetchPrev = () => {
      if (searchPage === 0) return

      setSearchTag((prev) => ({
        ...prev,
        page: prev.page - 1,
      }))
    }

    if (searchPage === 0) return null

    return (
      <Button
        className="absolute -left-8 top-1/2 -translate-y-1/2"
        onClick={fetchPrev}
      >
        <IoIosArrowBack />
      </Button>
    )
  }

  const Indicator = () => {
    const Wrapper = ({ children }: { children: React.ReactNode }) => {
      return <div className="w-full flex justify-end pr-4">{children}</div>
    }

    const Content = () => {
      if (isPending)
        return (
          <ContentLoading
            style={{ width: "62px", flexShrink: "0", marginTop: "-16px" }}
          />
        )

      return (
        <div className="w-[62px] flex justify-center items-center">
          <span className="text-colorsDarkGray font-bold text-sm">
            {searchPage + 1}
          </span>
          <span className="text-secondary text-xs">&nbsp;/&nbsp;</span>
          <span className="text-primary font-bold text-sm">
            {searchPayload?.data?.pagination.total_page}
          </span>
        </div>
      )
    }

    return (
      <Wrapper>
        <Content />
      </Wrapper>
    )
  }

  if (searchPayload?.data && !searchPayload.data.total_count)
    return (
      <div className="w-full h-[68px] flex justify-center items-center text-colorsGray font-bold">
        일치하는 결과가 없습니다
      </div>
    )

  return (
    <>
      <ul className="relative w-[calc(100%-62px)] h-max mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-3 place-items-center mb-2">
        <Content />
        <PrevPageButton />
        <NextPageButton />
      </ul>
      <Indicator />
    </>
  )
}
