"use client"

import { TechTag } from "@/interfaces/tech-tag"
import { useEffect, useRef } from "react"
import SelectableTag from "./SelectableTag"
import { Input } from "../input/Input"
import Spacing from "../Spacing"
import { useRecoilValue } from "recoil"
import {
  renderedTagListSelector,
  selectedTagListAtom,
  tagListState,
} from "@/recoil/atoms/tag"
import Tag from "./Tag"
import { MdClose } from "react-icons/md"
import { questionEditorState } from "@/recoil/atoms/questionEditor"

interface TagState {
  renderTagList: Array<TechTag>
  selectedTagList: Array<TechTag>
}

interface SelectableTagListProps {
  tagList?: Array<TechTag>
  initialSelectedTagList?: TagState["selectedTagList"]
  searchable?: boolean
}

function SelectableTagList({
  tagList,
  initialSelectedTagList,
  searchable = false,
}: SelectableTagListProps) {
  const renderedTagList = useRecoilValue(renderedTagListSelector)
  const selectedTagList = useRecoilValue(selectedTagListAtom)
  const { updateQuestionEditorState } = useRecoilValue(questionEditorState)

  const {
    loadRenderableTagList,
    renderableTagListInit,
    selectedTagListInit,
    selectTag,
    unSelectTag,
  } = useRecoilValue(tagListState)

  useEffect(() => {
    updateQuestionEditorState({
      skills: [...selectedTagList],
    })
  }, [selectedTagList]) /* eslint-disable-line */

  useEffect(() => {
    tagList ? renderableTagListInit(tagList) : loadRenderableTagList()

    if (initialSelectedTagList) {
      selectedTagListInit(initialSelectedTagList)
    }
  }, [tagList, initialSelectedTagList]) /* eslint-disable-line */

  return (
    <div>
      {searchable && (
        <>
          <SelectableTagList.Search />
          <Spacing size={20} />
        </>
      )}
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-3">
        {renderedTagList.map((tag, index) => {
          return (
            <li key={`${tag}-${index}`}>
              <SelectableTag
                tag={tag}
                onSelect={({ selected, tag }) => {
                  selected ? selectTag(tag) : unSelectTag(tag)
                }}
                initialSelected={
                  !!selectedTagList.find((selectedTag) => selectedTag === tag)
                }
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

SelectableTagList.Search = function SelectableTagListSearch() {
  const renderedTagList = useRecoilValue(renderedTagListSelector)
  const { renderTagList, resetRenderTagList } = useRecoilValue(tagListState)

  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!inputRef?.current) return

    const targetValue = inputRef.current.value

    if (!targetValue) {
      resetRenderTagList()

      return
    }

    const matchedTagList = renderedTagList.filter((tag) => {
      const regExp = new RegExp(`${targetValue}`, "gi")
      return regExp.test(tag)
    })

    renderTagList([...matchedTagList])
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
  function SummerizedSelectedTagList() {
    const selectedTagList = useRecoilValue(selectedTagListAtom)
    const { unSelectTag } = useRecoilValue(tagListState)

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
                    unSelectTag(selectedTag)
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
