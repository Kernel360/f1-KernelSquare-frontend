"use client"

import { useRef } from "react"
import SelectableTag from "./SelectableTag"
import { Input } from "../input/Input"
import Spacing from "../Spacing"
import Tag from "./Tag"
import { MdClose } from "react-icons/md"
import { useSelectTagList } from "@/hooks/useSelectTagList"
import { techTagList } from "@/constants/editor"
import type { TechTag } from "@/interfaces/tech-tag"
import type {
  TagListAtomParam,
  UseSelectTagListOption,
} from "@/hooks/useSelectTagList"

interface TagState {
  renderTagList: Array<TechTag>
  selectedTagList: Array<TechTag>
}

interface SelectableTagListProps {
  uniqueKey: string
  tagList?: Array<TechTag>
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
  tagList,
  initialSelectedTagList,
  searchable = false,
  maximumLength,
  callback,
}: SelectableTagListProps) {
  const {
    tagList: selectTagList,
    select,
    unselect,
  } = useSelectTagList({
    uniqueKey,
    initialTagList: tagList,
    initialSelectedTagList,
    callback,
  })

  return (
    <div>
      {searchable && (
        <>
          <SelectableTagList.Search
            uniqueKey="question"
            initialTagList={techTagList}
            initialSelectedTagList={initialSelectedTagList}
          />
          <Spacing size={20} />
        </>
      )}
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-3">
        {selectTagList.tagList.map((tag, index) => {
          return (
            <li key={`${tag}-${index}`}>
              <SelectableTag
                tag={tag}
                onSelect={({ selected, tag }) => {
                  if (!maximumLength) {
                    selected ? select(tag) : unselect(tag)

                    return
                  }

                  if (
                    selected &&
                    selectTagList.selectedTagList.length >= maximumLength
                  ) {
                    ;(maximumSelectableError.cause as any).maximum =
                      maximumLength
                    throw maximumSelectableError
                  }

                  selected ? select(tag) : unselect(tag)
                }}
                selected={selectTagList.selectedTagList.includes(tag)}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

SelectableTagList.Search = function SelectableTagListSearch({
  uniqueKey,
  initialTagList,
  initialSelectedTagList,
}: TagListAtomParam) {
  const { searchTagList } = useSelectTagList({
    uniqueKey,
    initialTagList,
    initialSelectedTagList,
  })

  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!inputRef?.current) return

    const targetValue = inputRef.current.value

    searchTagList(targetValue)
  }

  return (
    <Input
      ref={inputRef}
      onChange={handleChange}
      placeholder="관련있는 기술 스택을 검색해보세요"
      className="rounded-none border-l-0 border-r-0 border-t-0"
    />
  )
}

SelectableTagList.SummarizedSelectedTagList =
  function SummerizedSelectedTagList({
    uniqueKey,
    initialTagList,
    initialSelectedTagList,
    callback,
  }: UseSelectTagListOption) {
    const { tagList, unselect } = useSelectTagList({
      uniqueKey,
      initialTagList,
      initialSelectedTagList,
      callback,
    })

    return (
      <ul className="flex gap-2 flex-wrap">
        {tagList.selectedTagList.map((selectedTag) => {
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
